import { Enum } from 'enumify';

class ViewEnum extends Enum {}
ViewEnum.initEnum([
	'LOAD',
	'LOGIN',
	'REGISTER',
	'HOME',
	'SERVICE_ADD',
	'AREA_ADD',
	'OAUTH_LOGIN'
]);

export default ViewEnum;