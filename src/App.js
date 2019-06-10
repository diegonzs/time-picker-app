import React, { Component } from 'react';
import TimeForm from './form/time-form';
import { Divider, List } from 'antd';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
// import moment from 'moment';
import './App.css';

export const ALL_RECORDS_QUERY = gql`
  query ALL_RECORDS_QUERY {
    records {
      name,
      range {
        start,
        end,
      }
    }
  }
`;

class App extends Component {
  render() {
    return (
      <div className="App">
        <h1 className="title">Time Picker</h1>
        <TimeForm />
        <Divider>Records</Divider>
        <Query
          query={ALL_RECORDS_QUERY}
        >
          {({ loading, data, error }) => {
            if (loading) return <p>Cargando...</p>;
            if (error) return <p>Error</p>
            if (!data.records.length) return <p>No hay registros para mostrar</p>
            return (
              <List
                bordered
                dataSource={data.records}
                renderItem={item => (
                  <List.Item>{item.name} - from {item.range.start} to {item.range.end}</List.Item>
                )}
              />
            );
          }}
        </Query>
      </div>
    );
  }
}

export default App;
