const jwt = require('jsonwebtoken');
const uuid = require("uuid");
const moment = require('moment');
const fs = require('fs');


let client = {
	_id : '',
	openid : '',
	phone : '',
	token : ''
}

let rm  = {
	_id : '',
	openid : '',
	email  : '',
	token : ''
}

let  results = []



let  users = []


for( let i = 0; i<50; i++) {
	let example = {
		users: [],
		rm: '',
		group10: '', 
		groupAll: ''
	}

	let group10 = {
		groupNumber : '',
		members : []
	}

	let groupAll = {
		groupNumber : '',
		members : []
	}

	let rmID = 'ava2'.repeat(5) + getRandomInt(1000)
	let rmOpenid = 'asdasd12'.repeat(8) + getRandomInt(10000000)
	let rmEmail = 'fuckserver@pwc.com'

	rm._id = rmID;
	rm.openid = rmOpenid;
	rm.email = rmEmail;

	rm.token = generateToken(rm);

	group10.groupNumber = generateGroupNumber();
	groupAll.groupNumber = generateGroupNumber();

	group10.members.push(rmOpenid)
	groupAll.members.push(rmOpenid)

	example.rm = rm

	for (var v = 0 ; v < 19; v++) {

		let clientID = 'ava2'.repeat(5) + getRandomInt(1000)
		let clientOpenid = 'asdasd12'.repeat(8) + getRandomInt(10000000)
		let clientPhone = '18888888888'

		client._id = clientID
		client.openid = clientOpenid
		client.phone = clientPhone

		if (v<9) {
			group10.members.push(clientOpenid)
		} 
		groupAll.members.push(clientOpenid)

		client.token = generateToken(client);
		example.users.push(client)
		example.group10 = group10;
		example.groupAll = groupAll

	};

	results.push(example);

}

fs.writeFileSync("./demodata.json", JSON.stringify(results))

function getRandomInt(max) {
	return parseInt( (Math.random() + 1) * max)
}

function generateGroupNumber(){
    const uid = uuid.v4();
    const date = moment().format("YYYY-MM-DD");
    const groupNumber = 'ava_group-' + date + '-' + uid;
    return groupNumber;
}


function generateToken(params) {
    let condition = {}
    if (params.email) {
        condition.email = params.email;
    }
    if (params.phone) {
        condition.phone = params.phone;
    }
    condition._id = params._id;
    condition.fromSouce = params.fromSouce;
    let key = "ava_token_@!@";
    let token = "";

    token = jwt.sign(condition, key);
    return token;

}