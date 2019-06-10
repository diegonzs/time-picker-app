import React from 'react';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import { AutoForm, SubmitField, TextField } from 'uniforms-antd';
import TimeSchema from './schema';
import { ALL_RECORDS_QUERY } from '../App';

import RangeField from './range-field';

const CREATE_RECORD_MUTATION = gql`
	mutation CREATE_RECORD_MUTATION(
		$name: String!,
		$start: String!,
		$end: String!
	) {
		createRecord(
			data: {
				name: $name
				range: {
					create: {
						start: $start
						end: $end
					}
				}
			}
		) {
			name
			range {
				start
				end
			}
		}
	}
`;

const TimeForm = ({model}) => (
	<Mutation
		mutation={CREATE_RECORD_MUTATION}
		update={(cache, { data }) => {
			const queryData = cache.readQuery({ query: ALL_RECORDS_QUERY });
			queryData.records.push(data.createRecord);
			cache.writeQuery({
				query: ALL_RECORDS_QUERY,
				data,
			})
		}}
	>
		{(createRecord) => (
			<AutoForm
				schema={TimeSchema}
				model={model}
				onSubmit={doc => {
					console.log(doc);
					createRecord({
						variables: {
							name: doc.name,
							start: doc.range.start,
							end: doc.range.end,
						}
					})
				}}
			>
				<TextField name="name" />
				<RangeField name="range" />
				<SubmitField />
			</AutoForm>
		)}
	</Mutation>
	
);

export default TimeForm;
