function create() {
	created = 0;

	converted = [];

	if (!document.getElementById('input').value) {
		return document.getElementById('result').innerHTML = "结果：<br><strong style=\"color: red\">错误：输入框不能为空！</strong>";
	}
	if (!document.getElementById('bpm').value) {
		return document.getElementById('result').innerHTML = "结果：<br><strong style=\"color: red\">错误：BPM值不能为空！</strong>";
	} else if (document.getElementById('bpm').value < 1) {
		return document.getElementById('result').innerHTML = "结果：<br><strong style=\"color: red\">错误：BPM值不能低于1！</strong>";
	}

	document.getElementById('output').readOnly = false;

	if (document.getElementById('bpm_to_tps').checked) {
		var bpm_value = document.getElementById('bpm').value * 60 * document.getElementById('bb').value;
	} else {
		var bpm_value = document.getElementById('bpm').value;
	}

	const notes = document.getElementById('input').value.split(/,|;/);
	if (notes[notes.length - 1] === '') {
		notes.pop();
	}

	if (notes.length < 4) {
		document.getElementById('result').innerHTML = "结果：<br><strong style=\"color: red\">错误：不能少于4个音符！</strong>";
		document.getElementById('code_result').innerHTML = '';
		document.getElementById('output').innerHTML = '';
		document.getElementById('check_button').style.display = 'none';
		document.getElementById('save_button').style.display = 'none';
		document.getElementById('code1_result').innerHTML = '';
		document.getElementById('tiles_info').innerHTML = '';
		document.getElementById('speed_info').innerHTML = '';
		document.getElementById('delay_result').innerHTML = '';
		document.getElementById('code2_result').innerHTML = '';
		return;
	}

	let fs = ''; // first part
	let ss = ''; // second part
	let ts = ''; // third part

	/*
	    0.3 -> 30% of progress
	    0.6 -> 60% of progress
	    You can modify those values.
	*/
	for (var i = 0; i < Math.floor(notes.length * 0.32); i++) {
		fs += `${notes[i]},`;
	}

	for (var i = 0; i < Math.floor(notes.length * 0.64); i++) {
		ss += `${notes[i]},`;
	}

	for (var i = 0; i < notes.length; i++) {
		ts += `${notes[i]},`;
	}

	ss = ss.replace(fs, '');
	ts = ts.replace(fs + ss, '');

	console.log(`${fs}\n\n${ss}\n\n${ts}\n\n`);

	first_path(fs);
	first_path(ss);
	first_path(ts);

	if (document.getElementById('code_result').innerHTML.includes('red')) {
		document.getElementById('output').innerHTML = '';
		document.getElementById('result').innerHTML = '结果：';
		document.getElementById('check_button').style.display = 'none';
		document.getElementById('save_button').style.display = 'none';
		document.getElementById('code1_result').innerHTML = '';
		document.getElementById('tiles_info').innerHTML = '';
		document.getElementById('speed_info').innerHTML = '';
		document.getElementById('delay_result').innerHTML = '';
		document.getElementById('code2_result').innerHTML = '';
		return;
	}

	const song_data = {
		baseBpm: Number(bpm_value),
		musics: [{
			bpm: Number(bpm_value),
			baseBeats: Number(document.getElementById('bb').value),
			scores: [converted[0].replace(/.$/, ';'), fs.replace(/.$/, ';')],
			id: 1,
			instruments: ['piano', 'piano'],
			alternatives: ['', '']
		}, {
			bpm: Number(bpm_value),
			baseBeats: Number(document.getElementById('bb').value),
			scores: [converted[1].replace(/.$/, ';'), ss.replace(/.$/, ';')],
			id: 2,
			instruments: ['piano', 'piano'],
			alternatives: ['', '']
		}, {
			bpm: Number(bpm_value),
			baseBeats: Number(document.getElementById('bb').value),
			scores: [converted[2].replace(/.$/, ';'), ts.replace(/.$/, ';')],
			id: 3,
			instruments: ['piano', 'piano'],
			alternatives: ['', '']
		}]
	};

	if (document.getElementById('enable_audition').checked) {
		const last_note = ts.split(',');
		if (last_note[last_note.length - 1] === '') {
			last_note.pop();
		}
		song_data.audition = {
			start: [0, 0],
			end: [2, last_note.length - 1]
		}
	}

	if (document.getElementById('formatted').checked) {
		document.getElementById('output').innerHTML = JSON.stringify(song_data, null, 2);
	} else {
		document.getElementById('output').innerHTML = JSON.stringify(song_data);
	}

	document.getElementById('output').readOnly = true;
	document.getElementById('result').innerHTML = "结果：<br><strong style=\"color: lime\">创建成功。</strong>";

	document.getElementById('code1_result').innerHTML = '';
	document.getElementById('tiles_info').innerHTML = '';
	document.getElementById('speed_info').innerHTML = '';
	document.getElementById('delay_result').innerHTML = '';
	document.getElementById('code2_result').innerHTML = '';

	document.getElementById('check_button').style.display = 'inline-block';
	document.getElementById('save_button').style.display = 'inline-block';

	created = 1;
}