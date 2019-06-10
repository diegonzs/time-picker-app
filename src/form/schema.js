import {GraphQLBridge} from 'uniforms-bridge-graphql';
import {buildASTSchema} from 'graphql';
import {parse} from 'graphql';
import moment from 'moment';

const schema = `
	type Time {
		name: String!
		range: Range!
	}

	type Range {
		start: String!
		end: String!
	}

	scalar Date
	type Query { anything: ID }
`;

const schemaType = buildASTSchema(parse(schema)).getType('Time');

const schemaValidator = model => {
  const details = [];


  if (!model.name) {
    details.push({name: 'name', message: 'nombre es requerido!'});
	}

	if (!model.range.start || !model.range.end) {
		details.push({ name: 'range', message: 'tiempo es requerido' });
	} else {
		const startMoment = moment(model.range.start, 'HH:mm');
		const endMoment = moment(model.range.end, 'HH:mm');
		if (startMoment.isAfter(endMoment)) {
			details.push({ name: 'out-of-range', message: 'El tiempo de inicio tiene que ser menor al final' });
		}
	}

	// if (!model.range.start) {
	// 	details.push({ name: 'range', message: 'time rage is required' });
	// }

  if (details.length) {
		console.log('details', details);
    throw {details};
  }
};

const TimeSchema = new GraphQLBridge(schemaType, schemaValidator);

export default TimeSchema;
