import gql from 'graphql-tag';
import { Component } from './component';
import { ComponentMeta } from './component-meta';
import componentIdToPackageName from '../../utils/bit/component-id-to-package-name';
import { ComponentExtension } from './component.extension';
import { ComponentHost } from './component-factory';

export function componentSchema(componentExtension: ComponentExtension) {
  return {
    typeDefs: gql`
      type ComponentID {
        name: String!
        version: String
        scope: String
      }

      type Tag {
        version: String!
        snap: Snap!
      }

      type Snap {
        # hash of the snapshot.
        hash: String!

        # time of the snapshot.
        timestamp: String!

        # parents of the snap
        parents: [Snap]!

        # snapper
        author: Author!

        # snapshot message
        message: String
      }

      type Author {
        # display name of the snapper.
        displayName: String!

        # author of the snapper.
        email: String!
      }

      type Tag {
        # semver assigned to the tag.
        version: String!

        # tag snapshot.
        snap: Snap!
      }

      type Component {
        # id of the component.
        id: ComponentID!

        # head snap of the component.
        head: Snap

        # head tag of the component.
        headTag: Tag

        # display name of the component
        displayName: String!

        # determines whether the component is new.
        isNew: Boolean!

        # determines whether the component is modified since its last version.
        isModified: Boolean!

        # package name of the component.
        packageName: String

        # list of component releases.
        tags: [Tag]!
      }

      type ComponentHost {
        # load a component.
        get(id: String!, withState: Boolean): Component

        # list components
        list(offset: Int, limit: Int): [Component]!
      }

      type Query {
        getHost(id: String): ComponentHost
      }
    `,
    resolvers: {
      // ComponentMeta: {
      //   id: (component: ComponentMeta) => component.id.toObject(),
      //   displayName: (component: ComponentMeta) => component.displayName,
      // },
      Component: {
        id: (component: Component) => component.id.toObject(),
        displayName: (component: Component) => component.displayName,
        headTag: (component: Component) => component.headTag,
        tags: (component) => {
          // graphql doesn't support map types
          return component.tags.toArray().map((tag) => tag.toObject());
        },
        isNew: (component: Component) => component.isNew(),
        isModified: (component: Component) => component.isModified(),
        /**
         * :TODO use legacy until @david will move it to the pkg extension.
         */
        packageName: async (component: Component) => {
          return componentIdToPackageName({
            id: component.id._legacy,
            bindingPrefix: (await component.getState())._consumer.bindingPrefix,
            defaultScope: (await component.getState())._consumer.defaultScope,
            withPrefix: true,
            extensions: (await component.getState()).config.extensions,
            isDependency: false,
          });
        },
      },
      ComponentHost: {
        get: async (host: ComponentHost, { id }: { id: string }) => {
          const componentId = await host.resolveComponentId(id);
          const comp = await host.get(componentId);
          return comp;
        },
        list: async (host: ComponentHost, { offset, limit }: { offset: number; limit: number }) => {
          return host.list({ offset, limit });
        },
      },
      Query: {
        getHost: (componentExt: ComponentExtension, { id }: { id: string }) => {
          return componentExtension.getHost(id);
        },
      },
    },
  };
}
