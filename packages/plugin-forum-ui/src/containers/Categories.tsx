import React from 'react';
import { useQuery } from 'react-apollo';
import gql from 'graphql-tag';
import Category from './NavCategory';
import { Switch, Route, Link, useRouteMatch } from 'react-router-dom';

const CATEGORIES = gql`
  query ForumCategories($parentId: [ID]) {
    forumCategories(parentId: $parentId) {
      _id
      code
      name
    }
  }
`;

export default function Categories() {
  const { data, loading, error } = useQuery(CATEGORIES, {
    variables: { parentId: [null] }
  });
  const { path, url } = useRouteMatch();

  if (loading) return null;

  if (error) return <pre>{JSON.stringify(error, null, 2)}</pre>;

  const forumCategories = data.forumCategories || [];

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr' }}>
      <ul>
        {forumCategories.map(category => (
          <li>
            <Category key={category._id} category={category} />
          </li>
        ))}
      </ul>
      <div>
        <Switch>
          <Route path={`${path}/:_id`}>
            <h1>cat</h1>
          </Route>
        </Switch>
      </div>
    </div>
  );
}
