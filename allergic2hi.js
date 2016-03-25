module['exports'] = function allergic (hook) {
	var request = require('request');
	var key = hook.env.allergicAPI;
	var spamList = [
			"hello",
			"hey",
			"how are you",
			"salam",
			"khubi",
			"khubi",
			"droud", 
			"dorood", 
			"slm", 
			"bye", 
			"good bye", 
			"goodbye", 
			"درود", 
			"سلام",
			"های",
			"خوبی",
			"احوال",
			"اهلا",
			"مرحبا",
			"خداحافظ",
	];
	var msg = hook.params.message.text.toLowerCase();
	var wsCount = (msg.match(/\S+/g)).length;

	if (wsCount < 5) {
		var flag = false;
		for (index = 0; index < spamList.length; ++index) {
			if(msg.indexOf(spamList[index]) > -1) {
				flag = true;
				break;
			}
		}

		if(flag == false) {
			var regList = [
				/^(.|\n)*s+a+l+a+m+(.|\n)*$/,
				/^(.|\n)*h+i+(.|\n)*$/,
				/^(.|\n)*h+e+l+o+(.|\n)*$/,
				/^(.|\n)*k+h+(u|o)+b+i+(.|\n)*$/,
				/^(.|\n)*س+ل+ا+م+(.|\n)*$/,
				/^(.|\n)*خ+و+ب+ی+(.|\n)*$/,
				/^(.|\n)*خ+د+ا+ح+ا+ف+ظ+(.|\n)*$/,
				/^(.|\n)*خ+د+ا+ن+گ+ه+د+ا+ر+(.|\n)*$/,
			];
			for (index = 0; index < regList.length; ++index) {
				if(msg.match(regList[index])) {
					flag = true;
					break;
				}
			}
		}	
		var _from = hook.params.message.from;
		var _userName = "";
		// find user name at the best state
		if(_from.first_name == undefined && _from.last_name == undefined) {
			_userName = "";
		} 
		if (_from.first_name != undefined) {
			 _userName += _from.first_name;
		} 
		if (_from.last_name != undefined) {
			_userName += " " + _from.last_name;
		} 
		if(flag) {
			request
				.post('https://api.telegram.org/bot' + key + '/sendMessage')
			.form({
					"chat_id": hook.params.message.chat.id,
						"parse_mode": "Markdown",
					"text": "گیک عزیز  _" + _userName + "_ از *شما* انتظار بیشتری داریم 🙏🏼",
						"reply_to_message_id": hook.params.message.message_id
			});
		}
	}
};