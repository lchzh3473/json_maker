function numbers(o) {
	return /[^\u0030-\u0039]/.test(o);
}

function info() {
	let json_data = document.getElementById('output').value,
		json_array1 = [],
		json_array = [],
		error_json = "",
		bpm1 = "",
		bpm2 = "",
		bpm3 = "",
		delay = "";
	document.getElementById("delay_result").innerHTML = "";
	document.getElementById("code_result").innerHTML = "";
	document.getElementById("code1_result").innerHTML = "";
	document.getElementById("tiles_info").innerHTML = "";
	document.getElementById("speed_info").innerHTML = "";
	document.getElementById("code2_result").innerHTML = "";

	if (json_data === "") {
		document.getElementById("code_result").innerHTML = "<strong style=\"color: red\">Put something in textarea!</strong>";
	} else {
		split1 = json_data.indexOf("[\"");
		split2 = json_data.indexOf("\"]");
		id1 = json_data.substr(split1 + 2, split2 - split1 - 2);
		id1 = id1.split("\",\"");
		json_data1 = json_data.substr(0, split1 + 2);
		json_data2 = json_data.substr(split2);
		json_array1.push(json_data1);
		json_array1.push(json_data2);
		json_check = json_array1[0];
		json_data = json_array1[1];
		json_check = json_check.split(",");

		for (i = 0; i < json_check.length; i++) {
			if (!json_check[i].includes(":")) {
				error_json = json_check[i];
			} else {
				json_array.push(json_check[i].split(":"));
			}
		}

		json_check = json_array;

		if (json_check[0][0] !== "{\"baseBpm\"") {
			error_json = json_check[0][0];
		} else if (json_check[0][1] === "") {
			error_json = "{\"baseBpm\":,";
		} else if (isNaN(Number(json_check[0][1]))) {
			error_json = `${json_check[0][0]}:${json_check[0][1]}`;
		} else if (json_check[1][0] !== "\"musics\"") {
			error_json = json_check[1][0];
		} else {
			if (json_check[1][1] === "[{\"bpm\"") {
				if (json_check[1][2] === "") {
					error_json = "[{\"bpm\":,";
				} else if (isNaN(Number(json_check[1][2]))) {
					error_json = `${json_check[1][1]}:${json_check[1][2]}`;
				} else {
					id_exists = false;
					bpm1 = parseFloat(json_check[1][2]);

					for (i = 2; i < json_check.length; i++) {
						if (json_check[i][0] === "\"id\"") {
							id_exists = true;
						} else {
							if (json_check[i][0] !== "\"measureBeats\"" && json_check[i][0] !== "\"baseBeats\"" && json_check[i][0] !== "\"scores\"") {
								error_json = json_check[i][0];
							} else if (json_check[i][0] === "\"baseBeats\"") {
								basebeats1 = parseFloat(json_check[i][1]);
							}
						}
					}
				}
			} else if (json_check[1][1] === "[{\"id\"") {
				if (json_check[1][2] === "") {
					error_json = "[{\"id\":,";
				} else if (json_check[1][2] !== "1") {
					error_json = `${json_check[1][1]}:${json_check[1][2]}`;
				} else {
					id_exists = true;

					for (i = 2; i < json_check.length; i++) {
						if (json_check[i][0] !== "\"measureBeats\"" && json_check[i][0] !== "\"baseBeats\"" && json_check[i][0] !== "\"scores\"" && json_check[i][0] !== "\"bpm\"") {
							error_json = json_check[i][0];
						} else if (json_check[i][0] === "\"baseBeats\"") {
							basebeats1 = parseFloat(json_check[i][1]);
						} else if (json_check[i][0] === "\"bpm\"") {
							bpm1 = parseFloat(json_check[i][1]);
						}
					}

					if (bpm1 == "") {
						bpm1 = prompt("I didn't detect speeds. Please put first speed below (in TPS):");
						bpm1 = parseFloat(bpm1);
						bpm1 = (bpm1 * 60).toFixed(1);
						bpm1 = bpm1 * basebeats1;
					}
				}
			} else {
				error_json = json_check[1][1];
			}

			if (error_json === "") {
				if (id_exists == true) {
					if (json_data.indexOf("\"]}") == 0) {
						json_data = json_data.substr(2);
					} else {
						error_json = json_data.substr(0, 10);
					}

					split1 = json_data.indexOf("[\"");
					split2 = json_data.indexOf("\"]");
					id2 = json_data.substr(split1 + 2, split2 - split1 - 2);
					id2 = id2.split("\",\"");
					json_data1 = json_data.substr(0, split1 + 2);
					json_data2 = json_data.substr(split2);
					json_array = [];
					json_array1 = [];
					json_check = [];
					json_array1.push(json_data1);
					json_array1.push(json_data2);
					json_check = json_array1[0];
					json_data = json_array1[1];
					json_check = json_check.split(",");

					for (i = 1; i < json_check.length; i++) {
						if (!json_check[i].includes(":")) {
							error_json = json_check[i];
						} else {
							json_array.push(json_check[i].split(":"));
						}
					}

					json_check = json_array;

					if (json_check[0][0] !== "{\"id\"" && json_check[0][0] !== "{\"bpm\"") {
						error_json = `${json_check[0][0]}:${json_check[0][1]}`;
					} else if (json_check[0][0] === "{\"bpm\"") {
						bpm2 = parseFloat(json_check[0][1]);
					}

					for (i = 1; i < json_check.length; i++) {
						if (json_check[i][0] !== "\"measureBeats\"" && json_check[i][0] !== "\"baseBeats\"" && json_check[i][0] !== "\"scores\"" && json_check[i][0] !== "\"bpm\"" && json_check[i][0] !== "\"id\"") {
							error_json = json_check[i][0];
						} else if (json_check[i][0] === "\"baseBeats\"") {
							basebeats2 = parseFloat(json_check[i][1]);
						} else if (json_check[i][0] === "\"bpm\"") {
							bpm2 = parseFloat(json_check[i][1]);
						}
					}

					if (bpm2 == "") {
						bpm2 = prompt("Please put second speed below (in TPS):");
						bpm2 = parseFloat(bpm2);
						bpm2 = (bpm2 * 60).toFixed(1);
						bpm2 = bpm2 * basebeats2;
					}

					if (json_data.indexOf("\"]}") == 0) {
						json_data = json_data.substr(2);
					} else {
						error_json = json_data.substr(0, 10);
					}

					split1 = json_data.indexOf("[\"");
					split2 = json_data.indexOf("\"]");
					id3 = json_data.substr(split1 + 2, split2 - split1 - 2);
					id3 = id3.split("\",\"");
					json_data1 = json_data.substr(0, split1 + 2);
					json_data2 = json_data.substr(split2);
					json_array = [];
					json_array1 = [];
					json_check = [];
					json_array1.push(json_data1);
					json_array1.push(json_data2);
					json_check = json_array1[0];
					json_data = json_array1[1];
					json_check = json_check.split(",");

					for (i = 1; i < json_check.length; i++) {
						if (!json_check[i].includes(":")) {
							error_json = json_check[i];
						} else {
							json_array.push(json_check[i].split(":"));
						}
					}

					json_check = json_array;

					if (json_check[0][0] !== "{\"id\"" && json_check[0][0] !== "{\"bpm\"") {
						error_json = `${json_check[0][0]}:${json_check[0][1]}`;
					} else if (json_check[0][0] === "{\"bpm\"") {
						bpm3 = parseFloat(json_check[0][1]);
					}

					for (i = 1; i < json_check.length; i++) {
						if (json_check[i][0] !== "\"measureBeats\"" && json_check[i][0] !== "\"baseBeats\"" && json_check[i][0] !== "\"scores\"" && json_check[i][0] !== "\"bpm\"" && json_check[i][0] !== "\"id\"") {
							error_json = json_check[i][0];
						} else if (json_check[i][0] === "\"baseBeats\"") {
							basebeats3 = parseFloat(json_check[i][1]);
						} else if (json_check[i][0] === "\"bpm\"") {
							bpm3 = parseFloat(json_check[i][1]);
						}
					}

					if (bpm3 == "") {
						bpm3 = prompt("Please put third speed below (in TPS):");
						bpm3 = parseFloat(bpm3);
						bpm3 = (bpm3 * 60).toFixed(1);
						bpm3 = bpm3 * basebeats3;
					}

					json_data = json_data.split(":[");

					if (json_data[0] === "\"]}],\"audition\":{\"start\"") {
						json_data1 = json_data[1].replace("],\"end\"", "");
						start_fav = json_data1.split(",");
						json_data2 = json_data[2].replace("]}}", "");
						end_fav = json_data2.split(",");

						if (isNaN(Number(start_fav[0]))) {
							error_json = json_data[1];
						} else if (isNaN(Number(start_fav[1]))) {
							error_json = json_data[1];
						} else if (isNaN(Number(end_fav[0]))) {
							error_json = json_data[2];
						} else if (isNaN(Number(end_fav[1]))) {
							error_json = json_data[2];
						}
					} else if (json_data[0] === "\"]}],\"audition\":{\"end\"") {
						json_data1 = json_data[1].replace("],\"start\"", "");
						start_fav = json_data1.split(",");
						json_data2 = json_data[2].replace("]}}", "");
						end_fav = json_data2.split(",");

						if (isNaN(Number(start_fav[0]))) {
							error_json = json_data[1];
						} else if (isNaN(Number(start_fav[1]))) {
							error_json = json_data[1];
						} else if (isNaN(Number(end_fav[0]))) {
							error_json = json_data[2];
						} else if (isNaN(Number(end_fav[1]))) {
							error_json = json_data[2];
						}
					} else if (json_data[0] === "\"]}]}") {
						error_json = "";
						//document.getElementById("code2_result").innerHTML = "<strong style='color: lime'>Note: No audition detected! (optional)</strong>";
					} else {
						error_json = json_data[0];
					}
				} else {
					if (json_data.indexOf("\"]") == 0) {
						json_data = json_data.substr(2);
					} else {
						error_json = json_data.substr(0, 10);
					}

					split1 = json_data.indexOf("[\"");
					split2 = json_data.indexOf("\"]");
					instruments = json_data.substr(split1 + 2, split2 - split1 - 2);
					instruments = instruments.split("\",\"");

					for (i = 0; i < instruments.length; i++) {
						if (instruments[i] !== "bass" && instruments[i] !== "bass2" && instruments[i] !== "drum" && instruments[i] !== "piano") {
							error_json = instruments[i];
						}
					}

					json_data1 = json_data.substr(0, split1 + 2);
					json_data2 = json_data.substr(split2);
					json_array = [];
					json_array1 = [];
					json_check = [];
					json_array1.push(json_data1);
					json_array1.push(json_data2);
					json_check = json_array1[0];
					json_data = json_array1[1];
					json_check = json_check.split(",");

					for (i = 0; i < json_check.length; i++) {
						if (!json_check[i].includes(":")) {
							error_json = json_check[i];
						} else {
							json_array.push(json_check[i].split(":"));
						}
					}

					json_check = json_array;

					if (json_check[0][0] !== "\"id\"") {
						error_json = json_check[0][0];
					} else if (json_check[0][1] !== "1") {
						error_json = `${json_check[0][0]}:${json_check[0][1]}`;
					} else if (json_check[1][0] !== "\"instruments\"") {
						error_json = json_check[1][0];
					} else if (json_check[1][1] !== "[\"") {
						error_json = `${json_check[0][0]}:${json_check[1][1]}`;
					} else {
						if (json_data.indexOf("\"]") == 0) {
							json_data = json_data.substr(2);
						} else {
							error_json = json_data.substr(0, 10);
						}

						split1 = json_data.indexOf("[\"");
						split2 = json_data.indexOf("\"]");
						alternatives = json_data.substr(split1 + 2, split2 - split1 - 2);
						alternatives = alternatives.split("\",\"");
						json_data1 = json_data.substr(0, split1 + 2);
						json_data2 = json_data.substr(split2);
						json_array = [];
						json_array1 = [];
						json_check = [];
						json_array1.push(json_data1);
						json_array1.push(json_data2);
						json_check = json_array1[0];

						if (json_check !== ",\"alternatives\":[\"") {
							error_json = json_check;
						}

						if (alternatives.length < id1.length || instruments.length < id1.length) {
							error_json = "<strong style=\"color: red\">instruments and alternatives are not equal to amount of paths from id: <strong style=\"color: gold\">1</strong></strong>";
						}

						json_data = json_array1[1];

						if (json_data.indexOf("\"]}") == 0) {
							json_data = json_data.substr(2);
						} else {
							error_json = json_data.substr(0, 10);
						}

						split1 = json_data.indexOf("[\"");
						split2 = json_data.indexOf("\"]");
						id2 = json_data.substr(split1 + 2, split2 - split1 - 2);
						id2 = id2.split("\",\"");
						json_data1 = json_data.substr(0, split1 + 2);
						json_data2 = json_data.substr(split2);
						json_array = [];
						json_array1 = [];
						json_check = [];
						json_array1.push(json_data1);
						json_array1.push(json_data2);
						json_check = json_array1[0];
						json_data = json_array1[1];
						json_check = json_check.split(",");

						for (i = 1; i < json_check.length; i++) {
							if (!json_check[i].includes(":")) {
								error_json = json_check[i];
							} else {
								json_array.push(json_check[i].split(":"));
							}
						}

						json_check = json_array;

						if (json_check[0][0] !== "{\"bpm\"" || isNaN(Number(json_check[0][1]))) {
							error_json = `${json_check[0][0]}:${json_check[0][1]}`;
						} else {
							bpm2 = parseFloat(json_check[0][1]);
						}

						for (i = 1; i < json_check.length; i++) {
							if (json_check[i][0] !== "\"measureBeats\"" && json_check[i][0] !== "\"baseBeats\"" && json_check[i][0] !== "\"scores\"") {
								error_json = json_check[i][0];
							} else if (json_check[i][0] === "\"baseBeats\"") {
								basebeats2 = parseFloat(json_check[i][1]);
							}
						}

						if (json_data.indexOf("\"]") == 0) {
							json_data = json_data.substr(2);
						} else {
							error_json = json_data.substr(0, 10);
						}

						split1 = json_data.indexOf("[\"");
						split2 = json_data.indexOf("\"]");
						instruments = json_data.substr(split1 + 2, split2 - split1 - 2);
						instruments = instruments.split("\",\"");

						for (i = 0; i < instruments.length; i++) {
							if (instruments[i] !== "bass" && instruments[i] !== "bass2" && instruments[i] !== "drum" && instruments[i] !== "piano") {
								error_json = instruments[i];
							}
						}

						json_data1 = json_data.substr(0, split1 + 2);
						json_data2 = json_data.substr(split2);
						json_array = [];
						json_array1 = [];
						json_check = [];
						json_array1.push(json_data1);
						json_array1.push(json_data2);
						json_check = json_array1[0];
						json_data = json_array1[1];
						json_check = json_check.split(",");

						for (i = 0; i < json_check.length; i++) {
							if (!json_check[i].includes(":")) {
								error_json = json_check[i];
							} else {
								json_array.push(json_check[i].split(":"));
							}
						}

						json_check = json_array;

						if (json_check[0][0] !== "\"id\"") {
							error_json = json_check[0][0];
						} else if (json_check[0][1] !== "2") {
							error_json = `${json_check[0][0]}:${json_check[0][1]}`;
						} else if (json_check[1][0] !== "\"instruments\"") {
							error_json = json_check[1][0];
						} else if (json_check[1][1] !== "[\"") {
							error_json = `${json_check[1][0]}:${json_check[1][1]}`;
						} else {
							if (json_data.indexOf("\"]") == 0) {
								json_data = json_data.substr(2);
							} else {
								error_json = json_data.substr(0, 10);
							}

							split1 = json_data.indexOf("[\"");
							split2 = json_data.indexOf("\"]");
							alternatives = json_data.substr(split1 + 2, split2 - split1 - 2);
							alternatives = alternatives.split("\",\"");
							json_data1 = json_data.substr(0, split1 + 2);
							json_data2 = json_data.substr(split2);
							json_array = [];
							json_array1 = [];
							json_check = [];
							json_array1.push(json_data1);
							json_array1.push(json_data2);
							json_check = json_array1[0];

							if (json_check !== ",\"alternatives\":[\"") {
								error_json = json_check;
							}

							if (alternatives.length < id2.length || instruments.length < id2.length) {
								error_json = "<strong style=\"color: red\">instruments and alternatives are not equal to amount of paths from id: <strong style=\"color: gold\">2</strong></strong>";
							}

							json_data = json_array1[1];

							if (json_data.indexOf("\"]}") == 0) {
								json_data = json_data.substr(2);
							} else {
								error_json = json_data.substr(0, 10);
							}

							split1 = json_data.indexOf("[\"");
							split2 = json_data.indexOf("\"]");
							id3 = json_data.substr(split1 + 2, split2 - split1 - 2);
							id3 = id3.split("\",\"");
							json_data1 = json_data.substr(0, split1 + 2);
							json_data2 = json_data.substr(split2);
							json_array = [];
							json_array1 = [];
							json_check = [];
							json_array1.push(json_data1);
							json_array1.push(json_data2);
							json_check = json_array1[0];
							json_data = json_array1[1];
							json_check = json_check.split(",");

							for (i = 1; i < json_check.length; i++) {
								if (!json_check[i].includes(":")) {
									error_json = json_check[i];
								} else {
									json_array.push(json_check[i].split(":"));
								}
							}

							json_check = json_array;

							if (json_check[0][0] !== "{\"bpm\"" || isNaN(Number(json_check[0][1]))) {
								error_json = `${json_check[0][0]}:${json_check[0][1]}`;
							} else {
								bpm3 = parseFloat(json_check[0][1]);
							}

							for (i = 1; i < json_check.length; i++) {
								if (json_check[i][0] !== "\"measureBeats\"" && json_check[i][0] !== "\"baseBeats\"" && json_check[i][0] !== "\"scores\"") {
									error_json = json_check[i][0];
								} else if (json_check[i][0] === "\"baseBeats\"") {
									basebeats3 = parseFloat(json_check[i][1]);
								}
							}

							if (json_data.indexOf("\"]") == 0) {
								json_data = json_data.substr(2);
							} else {
								error_json = json_data.substr(0, 10);
							}

							split1 = json_data.indexOf("[\"");
							split2 = json_data.indexOf("\"]");
							instruments = json_data.substr(split1 + 2, split2 - split1 - 2);
							instruments = instruments.split("\",\"");

							for (i = 0; i < instruments.length; i++) {
								if (instruments[i] !== "bass" && instruments[i] !== "bass2" && instruments[i] !== "drum" && instruments[i] !== "piano") {
									error_json = instruments[i];
								}
							}

							json_data1 = json_data.substr(0, split1 + 2);
							json_data2 = json_data.substr(split2);
							json_array = [];
							json_array1 = [];
							json_check = [];
							json_array1.push(json_data1);
							json_array1.push(json_data2);
							json_check = json_array1[0];
							json_data = json_array1[1];
							json_check = json_check.split(",");

							for (i = 0; i < json_check.length; i++) {
								if (!json_check[i].includes(":")) {
									error_json = json_check[i];
								} else {
									json_array.push(json_check[i].split(":"));
								}
							}

							json_check = json_array;

							if (json_check[0][0] !== "\"id\"") {
								error_json = json_check[0][0];
							} else if (json_check[0][1] !== "3") {
								error_json = `${json_check[0][0]}:${json_check[0][1]}`;
							} else if (json_check[1][0] !== "\"instruments\"") {
								error_json = json_check[1][0];
							} else if (json_check[1][1] !== "[\"") {
								error_json = `${json_check[1][0]}:${json_check[1][1]}`;
							} else {
								if (json_data.indexOf("\"]") == 0) {
									json_data = json_data.substr(2);
								} else {
									error_json = json_data.substr(0, 10);
								}

								split1 = json_data.indexOf("[\"");
								split2 = json_data.indexOf("\"]");
								alternatives = json_data.substr(split1 + 2, split2 - split1 - 2);
								alternatives = alternatives.split("\",\"");
								json_data1 = json_data.substr(0, split1 + 2);
								json_data2 = json_data.substr(split2);
								json_array = [];
								json_array1 = [];
								json_check = [];
								json_array1.push(json_data1);
								json_array1.push(json_data2);
								json_check = json_array1[0];

								if (json_check !== ",\"alternatives\":[\"") {
									error_json = json_check;
								}

								if (alternatives.length < id3.length || instruments.length < id3.length) {
									error_json = "<strong style=\"color: red\">instruments and alternatives are not equal to amount of paths from id: <strong style=\"color: gold\">3</strong></strong>";
								}

								json_data = json_array1[1];
								json_data = json_data.split(":[");

								if (json_data[0] === "\"]}],\"audition\":{\"start\"") {
									json_data1 = json_data[1].replace("],\"end\"", "");
									start_fav = json_data1.split(",");
									json_data2 = json_data[2].replace("]}}", "");
									end_fav = json_data2.split(",");

									if (isNaN(Number(start_fav[0]))) {
										error_json = json_data[1];
									} else if (isNaN(Number(start_fav[1]))) {
										error_json = json_data[1];
									} else if (isNaN(Number(end_fav[0]))) {
										error_json = json_data[2];
									} else if (isNaN(Number(end_fav[1]))) {
										error_json = json_data[2];
									}
								} else if (json_data[0] === "\"]}],\"audition\":{\"end\"") {
									json_data1 = json_data[1].replace("],\"start\"", "");
									start_fav = json_data1.split(",");
									json_data2 = json_data[2].replace("]}}", "");
									end_fav = json_data2.split(",");

									if (isNaN(Number(start_fav[0]))) {
										error_json = json_data[1];
									} else if (isNaN(Number(start_fav[1]))) {
										error_json = json_data[1];
									} else if (isNaN(Number(end_fav[0]))) {
										error_json = json_data[2];
									} else if (isNaN(Number(end_fav[1]))) {
										error_json = json_data[2];
									}
								} else if (json_data[0] === "\"]}]}") {
									error_json = "";
									//document.getElementById("code2_result").innerHTML = "<strong style='color: lime'>Note: No audition detected! (optional)</strong>";
								} else {
									error_json = json_data[0];
								}
							}
						}
					}
				}
			}
		}

		if (isNaN(bpm1) || isNaN(bpm2) || isNaN(bpm3)) {
			error_json = "<strong style=\"color: red\">Unknown speed</strong>";
		} else if (bpm1 <= 0 || bpm2 <= 0 || bpm3 <= 0) {
			error_json = "<strong style=\"color: red\">Speeds lower or equal to 0!</strong>";
		}

		if (error_json.length > 0) {
			document.getElementById("code_result").innerHTML = `<strong style="color: red">JSON ERROR: <strong style="color: gold">${error_json}</strong></strong>`;
		} else {
			multiplying1 = 0.03125 / basebeats1;
			multiplying2 = 0.03125 / basebeats2;
			multiplying3 = 0.03125 / basebeats3;

			for (i = 0; i < id1.length; i++) {
				if (id1[i].length - 1 !== "," || id1[i].length - 1 !== ";") {
					id1[i] = `${id1[i]},`;
				}
			}

			for (i = 0; i < id2.length; i++) {
				if (id2[i].length - 1 !== "," || id2[i].length - 1 !== ";") {
					id2[i] = `${id2[i]},`;
				}
			}

			for (i = 0; i < id3.length; i++) {
				if (id3[i].length - 1 !== "," || id3[i].length - 1 !== ";") {
					id3[i] = `${id3[i]},`;
				}
			}

			first_path_id1 = id1[0];
			id1_err = id1.join();
			first_path_id2 = id2[0];
			id2_err = id2.join();
			first_path_id3 = id3[0];
			id3_err = id3.join();
			id1_path_bg1 = [];
			id2_path_bg1 = [];
			id3_path_bg1 = [];

			for (i = 0; i < id1.length; i++) {
				id1_path_bg = id1[i].replace(/1|2|3|4|5|6|7|8|9|0|\x21|\x23|\x24|\x25|\x26|\x28|\x29|\x40|\x2c|\x2d|\x2e|\x3b|\x3c|\x3e|\x5b|\x5d|\x5e|\x7b|\x7d|\x7e|mute|empty|A|B|C|D|E|F|G|a|b|c|d|e|f|g/g, "");
				id1_path_bg = id1_path_bg.replace(/Q/g, "RR");
				id1_path_bg = id1_path_bg.replace(/R/g, "SS");
				id1_path_bg = id1_path_bg.replace(/S/g, "TT");
				id1_path_bg = id1_path_bg.replace(/T/g, "UU");
				id1_path_bg = id1_path_bg.replace(/U/g, "VV");
				id1_path_bg = id1_path_bg.replace(/V/g, "WW");
				id1_path_bg = id1_path_bg.replace(/W/g, "XX");
				id1_path_bg = id1_path_bg.replace(/X/g, "YY");
				id1_path_bg = id1_path_bg.replace(/Y/g, "P");
				id1_path_bg = id1_path_bg.replace(/H/g, "II");
				id1_path_bg = id1_path_bg.replace(/I/g, "JJ");
				id1_path_bg = id1_path_bg.replace(/J/g, "KK");
				id1_path_bg = id1_path_bg.replace(/K/g, "LL");
				id1_path_bg = id1_path_bg.replace(/L/g, "MM");
				id1_path_bg = id1_path_bg.replace(/M/g, "NN");
				id1_path_bg = id1_path_bg.replace(/N/g, "OO");
				id1_path_bg = id1_path_bg.replace(/O/g, "PP");
				id1_path_bg1.push(id1_path_bg.length);
			}

			for (i = 1; i < id1_path_bg1.length; i++) {
				first_length = (id1_path_bg1[0] * multiplying1).toFixed(3);
				path_background = (id1_path_bg1[i] * multiplying1).toFixed(3);
				j = i + 1;

				if (path_background != first_length) {
					delay = `id: <strong style="color: gold">1</strong>, Path 1: <strong style="color: gold">${parseFloat(first_length)}</strong>, Path ${j}: <strong style="color: gold">${parseFloat(path_background)}</strong>`;
				}
			}

			for (i = 0; i < id2.length; i++) {
				id2_path_bg = id2[i].replace(/1|2|3|4|5|6|7|8|9|0|\x21|\x23|\x24|\x25|\x26|\x28|\x29|\x40|\x2c|\x2d|\x2e|\x3b|\x3c|\x3e|\x5b|\x5d|\x5e|\x7b|\x7d|\x7e|mute|empty|A|B|C|D|E|F|G|a|b|c|d|e|f|g/g, "");
				id2_path_bg = id2_path_bg.replace(/Q/g, "RR");
				id2_path_bg = id2_path_bg.replace(/R/g, "SS");
				id2_path_bg = id2_path_bg.replace(/S/g, "TT");
				id2_path_bg = id2_path_bg.replace(/T/g, "UU");
				id2_path_bg = id2_path_bg.replace(/U/g, "VV");
				id2_path_bg = id2_path_bg.replace(/V/g, "WW");
				id2_path_bg = id2_path_bg.replace(/W/g, "XX");
				id2_path_bg = id2_path_bg.replace(/X/g, "YY");
				id2_path_bg = id2_path_bg.replace(/Y/g, "P");
				id2_path_bg = id2_path_bg.replace(/H/g, "II");
				id2_path_bg = id2_path_bg.replace(/I/g, "JJ");
				id2_path_bg = id2_path_bg.replace(/J/g, "KK");
				id2_path_bg = id2_path_bg.replace(/K/g, "LL");
				id2_path_bg = id2_path_bg.replace(/L/g, "MM");
				id2_path_bg = id2_path_bg.replace(/M/g, "NN");
				id2_path_bg = id2_path_bg.replace(/N/g, "OO");
				id2_path_bg = id2_path_bg.replace(/O/g, "PP");
				id2_path_bg1.push(id2_path_bg.length);
			}

			for (i = 1; i < id2_path_bg1.length; i++) {
				first_length = (id2_path_bg1[0] * multiplying1).toFixed(3);
				path_background = (id2_path_bg1[i] * multiplying1).toFixed(3);
				j = i + 1;

				if (path_background != first_length) {
					delay = `id: <strong style="color: gold">2</strong>, Path 1: <strong style="color: gold">${parseFloat(first_length)}</strong>, Path ${j}: <strong style="color: gold">${parseFloat(path_background)}</strong>`;
				}
			}

			for (i = 0; i < id3.length; i++) {
				id3_path_bg = id3[i].replace(/1|2|3|4|5|6|7|8|9|0|\x21|\x23|\x24|\x25|\x26|\x28|\x29|\x40|\x2c|\x2d|\x2e|\x3b|\x3c|\x3e|\x5b|\x5d|\x5e|\x7b|\x7d|\x7e|mute|empty|A|B|C|D|E|F|G|a|b|c|d|e|f|g/g, "");
				id3_path_bg = id3_path_bg.replace(/Q/g, "RR");
				id3_path_bg = id3_path_bg.replace(/R/g, "SS");
				id3_path_bg = id3_path_bg.replace(/S/g, "TT");
				id3_path_bg = id3_path_bg.replace(/T/g, "UU");
				id3_path_bg = id3_path_bg.replace(/U/g, "VV");
				id3_path_bg = id3_path_bg.replace(/V/g, "WW");
				id3_path_bg = id3_path_bg.replace(/W/g, "XX");
				id3_path_bg = id3_path_bg.replace(/X/g, "YY");
				id3_path_bg = id3_path_bg.replace(/Y/g, "P");
				id3_path_bg = id3_path_bg.replace(/H/g, "II");
				id3_path_bg = id3_path_bg.replace(/I/g, "JJ");
				id3_path_bg = id3_path_bg.replace(/J/g, "KK");
				id3_path_bg = id3_path_bg.replace(/K/g, "LL");
				id3_path_bg = id3_path_bg.replace(/L/g, "MM");
				id3_path_bg = id3_path_bg.replace(/M/g, "NN");
				id3_path_bg = id3_path_bg.replace(/N/g, "OO");
				id3_path_bg = id3_path_bg.replace(/O/g, "PP");
				id3_path_bg1.push(id3_path_bg.length);
			}

			for (i = 1; i < id3_path_bg1.length; i++) {
				first_length = (id3_path_bg1[0] * multiplying1).toFixed(3);
				path_background = (id3_path_bg1[i] * multiplying1).toFixed(3);
				j = i + 1;

				if (path_background != first_length) {
					delay = `id: <strong style="color: gold">3</strong>, Path 1: <strong style="color: gold">${parseFloat(first_length)}</strong>, Path ${j}: <strong style="color: gold">${parseFloat(path_background)}</strong>`;
				}
			}

			to_check_errors1 = first_path_id1 + id1_err;
			to_check_errors2 = first_path_id2 + id2_err;
			to_check_errors3 = first_path_id3 + id3_err;
			check_errors(first_path_id1, to_check_errors1, multiplying1);
			const tile = "P";
			const space = "Y";

			if (result1.length > 0) {
				document.getElementById("code_result").innerHTML = `<strong style="color: red">编码错误：长度小于1(<strong style="color: gold">${result1}</strong>)</strong>`;
			} else {
				if (result.length > 0) {
					document.getElementById("code_result").innerHTML = `<strong style="color: red">编码错误：<strong style="color: gold">${result}</strong></strong>`;
				} else if (result_tile.length > 0) {
					document.getElementById("code_result").innerHTML = `<strong style="color: red">编码错误：<strong style="color: gold">${result_tile}</strong></strong>`;
				} else if (result_tile1.length > 0) {
					document.getElementById("code_result").innerHTML = `<strong style="color: red">编码错误：<strong style="color: gold">${result_tile1}</strong></strong>`;
				} else if (error_json.length > 0) {
					document.getElementById("code_result").innerHTML = `<strong style="color: red">JSON ERROR: <strong style="color: gold">${error_json}</strong></strong>`;
				} else {
					if (bbb == 1) {
						check_errors(first_path_id2, to_check_errors2, multiplying2);

						if (result1.length > 0) {
							document.getElementById("code_result").innerHTML = `<strong style="color: red">编码错误：长度小于1(<strong style="color: gold">${result1}</strong>)</strong>`;
						} else {
							if (result.length > 0) {
								document.getElementById("code_result").innerHTML = `<strong style="color: red">编码错误：<strong style="color: gold">${result}</strong></strong>`;
							} else if (result_tile.length > 0) {
								document.getElementById("code_result").innerHTML = `<strong style="color: red">编码错误：<strong style="color: gold">${result_tile}</strong></strong>`;
							} else if (result_tile1.length > 0) {
								document.getElementById("code_result").innerHTML = `<strong style="color: red">编码错误：<strong style="color: gold">${result_tile1}</strong></strong>`;
							} else if (error_json.length > 0) {
								document.getElementById("code_result").innerHTML = `<strong style="color: red">JSON ERROR: <strong style="color: gold">${error_json}</strong></strong>`;
							} else {
								if (bbb == 1) {
									check_errors(first_path_id3, to_check_errors3, multiplying3);

									if (result1.length > 0) {
										document.getElementById("code_result").innerHTML = `<strong style="color: red">编码错误：长度小于1(<strong style="color: gold">${result1}</strong>)</strong>`;
									} else {
										if (result.length > 0) {
											document.getElementById("code_result").innerHTML = `<strong style="color: red">编码错误：<strong style="color: gold">${result}</strong></strong>`;
										} else if (result_tile.length > 0) {
											document.getElementById("code_result").innerHTML = `<strong style="color: red">编码错误：<strong style="color: gold">${result_tile}</strong></strong>`;
										} else if (result_tile1.length > 0) {
											document.getElementById("code_result").innerHTML = `<strong style="color: red">编码错误：<strong style="color: gold">${result_tile1}</strong></strong>`;
										} else if (error_json.length > 0) {
											document.getElementById("code_result").innerHTML = `<strong style="color: red">JSON ERROR: <strong style="color: gold">${error_json}</strong></strong>`;
										} else {
											if (bbb == 1) {
												if (delay.length > 0) {
													document.getElementById("delay_result").innerHTML = `<strong style="color: red">DELAY ERROR: ${delay}</strong><strongr>`;
												}

												path_special = first_path_id1 + first_path_id2 + first_path_id3;
												path_special = path_special.replace(/\x3b/g, ",");
												path_special = path_special.replace(/\x2c\x2c/g, ",");
												path_special = path_special.replace(/2\x3c/g, "hh<");
												path_special = path_special.replace(/3\x3c/g, "hi<");
												path_special = path_special.replace(/5\x3c/g, "hj<");
												path_special = path_special.replace(/6\x3c/g, "hk<");
												path_special = path_special.replace(/7\x3c/g, "hk<");
												path_special = path_special.replace(/8\x3c/g, "hk<");
												path_special = path_special.replace(/9\x3c/g, "hk<");
												path_special = path_special.replace(/10\x3c/g, "hh<");
												path_special = path_special.replace(/mute|empty|A|B|C|D|E|F|G|a|b|c|d|e|f|g|0|1|2|3|4|5|6|7|8|9|\x21|\x23|\x24|\x25|\x26|\x28|\x29|\x40|\x2d|\x2e|\x5b|\x5d|\x5e|\x7b|\x7c|\x7d|\x7e/g, "");
												path_special = path_special.replace(/P/g, tile.repeat(1));
												path_special = path_special.replace(/O/g, tile.repeat(2));
												path_special = path_special.replace(/N/g, tile.repeat(4));
												path_special = path_special.replace(/M/g, tile.repeat(8));
												path_special = path_special.replace(/L/g, tile.repeat(16));
												path_special = path_special.replace(/K/g, tile.repeat(32));
												path_special = path_special.replace(/J/g, tile.repeat(64));
												path_special = path_special.replace(/I/g, tile.repeat(128));
												path_special = path_special.replace(/H/g, tile.repeat(256));
												path_special = path_special.replace(/Y/g, space.repeat(1));
												path_special = path_special.replace(/X/g, space.repeat(2));
												path_special = path_special.replace(/W/g, space.repeat(4));
												path_special = path_special.replace(/V/g, space.repeat(8));
												path_special = path_special.replace(/U/g, space.repeat(16));
												path_special = path_special.replace(/T/g, space.repeat(32));
												path_special = path_special.replace(/S/g, space.repeat(64));
												path_special = path_special.replace(/R/g, space.repeat(128));
												path_special = path_special.replace(/Q/g, space.repeat(256));
												combo_length = [];
												b1 = path_special.match(/\x3c/g);

												if (b1 == null) {
													b1 = "";
												}

												b2 = path_special.match(/\x3e/g);

												if (b1.length > 0 && b2 == null) {
													path_special = "hk<>,hk<>";
													result = `<${result}`;
												}

												special_tiles = [];
												path_special = path_special.split(",");

												for (i = 0; i < path_special.length; i++) {
													j = i + 1;

													if (path_special[i].includes("<") && !path_special[i].includes(">")) {
														special_tiles.push(path_special[i]);
														path_special[i] = path_special[i].replace(path_special[i], "");

														if (!path_special[j].includes(">")) {
															path_special[j] = `${path_special[j]}<`;
														}
													} else if (path_special[i].includes(">") && !path_special[i].includes("<")) {
														special_tiles.push(path_special[i]);
														path_special[i] = path_special[i].replace(path_special[i], "");
													} else if (path_special[i].includes(">") && path_special[i].includes("<")) {
														special_tiles.push(path_special[i]);
														path_special[i] = path_special[i].replace(path_special[i], "");
													}
												}

												for (i = 0; i < special_tiles.length; i++) {
													if (special_tiles[i].lastIndexOf("<") == special_tiles[i].length - 1) {
														special_tiles[i] = special_tiles[i].substr(0, special_tiles[i].length - 1);
													}

													special_tiles[i] = special_tiles[i].replace(/\x3e/g, ">>");
												}

												if (special_tiles == "") {
													special_tiles = ["hk<>>", "hk<>>"];
												}

												if (special_tiles[0].indexOf("h") == 0) {
													special_tiles[0] = special_tiles[0].substr(1, special_tiles[0].length);
												}

												special_tiles1 = special_tiles.pop();

												if (special_tiles1.lastIndexOf(">") > special_tiles1.length - 2) {
													special_tiles1 = special_tiles1.substr(0, special_tiles1.length - 1);
												}

												special_tiles.push(special_tiles1);
												special_tiles = special_tiles.join();
												special_tiles = special_tiles.split(">,h");

												for (i = 0; i < special_tiles.length; i++) {
													if (special_tiles[i].includes("h")) {
														special_tiles[i] = 1;
													} else if (special_tiles[i].includes("i")) {
														combo_length = special_tiles[i].split(",");
														special_tiles[i] = combo_length.length;
													} else if (special_tiles[i].includes("j")) {
														special_tiles[i] = 4;
													} else if (special_tiles[i].includes("k")) {
														special_tiles[i] = 0;
													}
												}

												special_tiles_calc = 0;

												for (i = 0; i < special_tiles.length; i++) {
													special_tiles_calc = special_tiles_calc + special_tiles[i];
												}

												path_special = special_tiles_calc;
												first_path_id1_normal = first_path_id1.replace(/\x3b/g, ",");
												first_path_id1_normal = first_path_id1_normal.replace(/\x2c\x2c/g, ",");
												first_path_id1_normal = first_path_id1_normal.replace(/2\x3c/g, "hh<");
												first_path_id1_normal = first_path_id1_normal.replace(/3\x3c/g, "hi<");
												first_path_id1_normal = first_path_id1_normal.replace(/5\x3c/g, "hj<");
												first_path_id1_normal = first_path_id1_normal.replace(/6\x3c/g, "hk<");
												first_path_id1_normal = first_path_id1_normal.replace(/7\x3c/g, "hk<");
												first_path_id1_normal = first_path_id1_normal.replace(/8\x3c/g, "hk<");
												first_path_id1_normal = first_path_id1_normal.replace(/9\x3c/g, "hk<");
												first_path_id1_normal = first_path_id1_normal.replace(/10\x3c/g, "hh<");
												first_path_id1_normal = first_path_id1_normal.replace(/mute|empty|A|B|C|D|E|F|G|a|b|c|d|e|f|g|0|1|2|3|4|5|6|7|8|9|\x21|\x23|\x24|\x25|\x26|\x28|\x29|\x40|\x2d|\x2e|\x5b|\x5d|\x5e|\x7b|\x7c|\x7d|\x7e/g, "");
												first_path_id1_normal = first_path_id1_normal.replace(/P/g, tile.repeat(1));
												first_path_id1_normal = first_path_id1_normal.replace(/O/g, tile.repeat(2));
												first_path_id1_normal = first_path_id1_normal.replace(/N/g, tile.repeat(4));
												first_path_id1_normal = first_path_id1_normal.replace(/M/g, tile.repeat(8));
												first_path_id1_normal = first_path_id1_normal.replace(/L/g, tile.repeat(16));
												first_path_id1_normal = first_path_id1_normal.replace(/K/g, tile.repeat(32));
												first_path_id1_normal = first_path_id1_normal.replace(/J/g, tile.repeat(64));
												first_path_id1_normal = first_path_id1_normal.replace(/I/g, tile.repeat(128));
												first_path_id1_normal = first_path_id1_normal.replace(/H/g, tile.repeat(256));
												first_path_id1_normal = first_path_id1_normal.replace(/Y/g, space.repeat(1));
												first_path_id1_normal = first_path_id1_normal.replace(/X/g, space.repeat(2));
												first_path_id1_normal = first_path_id1_normal.replace(/W/g, space.repeat(4));
												first_path_id1_normal = first_path_id1_normal.replace(/V/g, space.repeat(8));
												first_path_id1_normal = first_path_id1_normal.replace(/U/g, space.repeat(16));
												first_path_id1_normal = first_path_id1_normal.replace(/T/g, space.repeat(32));
												first_path_id1_normal = first_path_id1_normal.replace(/S/g, space.repeat(64));
												first_path_id1_normal = first_path_id1_normal.replace(/R/g, space.repeat(128));
												first_path_id1_normal = first_path_id1_normal.replace(/Q/g, space.repeat(256));
												b1 = first_path_id1_normal.match(/\x3c/g);

												if (b1 == null) {
													b1 = "";
												}

												b2 = first_path_id1_normal.match(/\x3e/g);

												if (b1.length > 0 && b2 == null) {
													first_path_id1_normal = "hh<>,hh<>";
													result = `<${result}`;
												}

												special_tiles2 = [];
												first_path_id1_normal = first_path_id1_normal.split(",");

												for (i = 0; i < first_path_id1_normal.length; i++) {
													j = i + 1;

													if (first_path_id1_normal[i].includes("<") && !first_path_id1_normal[i].includes(">")) {
														special_tiles2.push(first_path_id1_normal[i]);
														first_path_id1_normal[i] = first_path_id1_normal[i].replace(first_path_id1_normal[i], "");

														if (!first_path_id1_normal[j].includes(">")) {
															first_path_id1_normal[j] = `${first_path_id1_normal[j]}<`;
														}
													} else if (first_path_id1_normal[i].includes(">") && !first_path_id1_normal[i].includes("<")) {
														special_tiles2.push(first_path_id1_normal[i]);
														first_path_id1_normal[i] = first_path_id1_normal[i].replace(first_path_id1_normal[i], "");
													} else if (first_path_id1_normal[i].includes(">") && first_path_id1_normal[i].includes("<")) {
														special_tiles2.push(first_path_id1_normal[i]);
														first_path_id1_normal[i] = first_path_id1_normal[i].replace(first_path_id1_normal[i], "");
													}
												}

												for (i = 0; i < special_tiles2.length; i++) {
													if (special_tiles2[i].lastIndexOf("<") == special_tiles2[i].length - 1) {
														special_tiles2[i] = special_tiles2[i].substr(0, special_tiles2[i].length - 1);
													}

													special_tiles2[i] = special_tiles2[i].replace(/\x3e/g, ">>");
												}

												if (special_tiles2 == "") {
													special_tiles2 = ["hh<>>", "hh<>>"];
												}

												if (special_tiles2[0].indexOf("h") == 0) {
													special_tiles2[0] = special_tiles2[0].substr(1, special_tiles2[0].length);
												}

												special_tiles21 = special_tiles2.pop();

												if (special_tiles21.includes(">")) {
													special_tiles21 = special_tiles21.substr(0, special_tiles21.length - 1);
												}

												special_tiles2.push(special_tiles21);
												special_tiles2 = special_tiles2.join();
												special_tiles2 = special_tiles2.split(">,h");

												for (i = 0; i < special_tiles2.length; i++) {
													if (special_tiles2[i].includes("h")) {
														special_tiles2[i] = "";
													} else if (special_tiles2[i].includes("i")) {
														special_tiles2[i] = "";
													} else if (special_tiles2[i].includes("j")) {
														special_tiles2[i] = "";
													} else {
														special_tiles2[i] = special_tiles2[i].replace(/k|\x3c|\x3e|\x2c/g, "");
													}
												}

												special_tiles2 = special_tiles2.map(_ref => {
													const length = _ref.length;
													const x = length;
													const length_of_tile = x * multiplying1;
													let m = length_of_tile % 1;

													if (length_of_tile == 1 && m == 0) {
														m = 0;
													} else if (length_of_tile < 1.5 && length_of_tile > 1) {
														m = 1;
													} else if (length_of_tile < 2 && length_of_tile >= 1.5) {
														m = 2;
													}

													if (length_of_tile == 2) {
														m = 1;
													} else if (length_of_tile > 2 && m < 0.5) {
														m = 1;
													} else if (length_of_tile > 2 && m >= 0.5 || length_of_tile > 2 && m < 1) {
														m = 2;
													}

													const n = parseInt(length_of_tile);
													const finaled = n + m;
													return finaled;
												});
												special_tiles2_calc = 0;

												for (i = 0; i < special_tiles2.length; i++) {
													special_tiles2_calc = special_tiles2_calc + special_tiles2[i];
												}

												for (i = 0; i < first_path_id1_normal.length; i++) {
													if (first_path_id1_normal[i].includes("Y")) {
														first_path_id1_normal[i] = first_path_id1_normal[i].replace(first_path_id1_normal[i], "");
													}
												}

												first_path_id1_normal_new = first_path_id1_normal.map(_ref2 => {
													const length = _ref2.length;
													const x = length;
													const length_of_tile = x * multiplying1;
													let m = length_of_tile % 1;

													if (length_of_tile == 1 && m == 0) {
														m = 0;
													} else if (length_of_tile < 1.5 && length_of_tile > 1) {
														m = 1;
													} else if (length_of_tile < 2 && length_of_tile >= 1.5) {
														m = 2;
													}

													if (length_of_tile == 2) {
														m = 1;
													} else if (length_of_tile > 2 && m < 0.5) {
														m = 1;
													} else if (length_of_tile > 2 && m >= 0.5 || length_of_tile > 2 && m < 1) {
														m = 2;
													}

													const n = parseInt(length_of_tile);
													const finaled = n + m;
													return finaled;
												});
												first_path_id1_normal = first_path_id1_normal_new;
												first_path_id1_normal_calc = 0;

												for (i = 0; i < first_path_id1_normal.length; i++) {
													first_path_id1_normal_calc = first_path_id1_normal_calc + first_path_id1_normal[i];
												}

												first_path_id1_normal_calc = first_path_id1_normal_calc + special_tiles2_calc; //first_path_id2

												first_path_id2_normal = first_path_id2.replace(/\x3b/g, ",");
												first_path_id2_normal = first_path_id2_normal.replace(/\x2c\x2c/g, ",");
												first_path_id2_normal = first_path_id2_normal.replace(/2\x3c/g, "hh<");
												first_path_id2_normal = first_path_id2_normal.replace(/3\x3c/g, "hi<");
												first_path_id2_normal = first_path_id2_normal.replace(/5\x3c/g, "hj<");
												first_path_id2_normal = first_path_id2_normal.replace(/6\x3c/g, "hk<");
												first_path_id2_normal = first_path_id2_normal.replace(/7\x3c/g, "hk<");
												first_path_id2_normal = first_path_id2_normal.replace(/8\x3c/g, "hk<");
												first_path_id2_normal = first_path_id2_normal.replace(/9\x3c/g, "hk<");
												first_path_id2_normal = first_path_id2_normal.replace(/10\x3c/g, "hh<");
												first_path_id2_normal = first_path_id2_normal.replace(/mute|empty|A|B|C|D|E|F|G|a|b|c|d|e|f|g|0|1|2|3|4|5|6|7|8|9|\x21|\x23|\x24|\x25|\x26|\x28|\x29|\x40|\x2d|\x2e|\x5b|\x5d|\x5e|\x7b|\x7c|\x7d|\x7e/g, "");
												first_path_id2_normal = first_path_id2_normal.replace(/P/g, tile.repeat(1));
												first_path_id2_normal = first_path_id2_normal.replace(/O/g, tile.repeat(2));
												first_path_id2_normal = first_path_id2_normal.replace(/N/g, tile.repeat(4));
												first_path_id2_normal = first_path_id2_normal.replace(/M/g, tile.repeat(8));
												first_path_id2_normal = first_path_id2_normal.replace(/L/g, tile.repeat(16));
												first_path_id2_normal = first_path_id2_normal.replace(/K/g, tile.repeat(32));
												first_path_id2_normal = first_path_id2_normal.replace(/J/g, tile.repeat(64));
												first_path_id2_normal = first_path_id2_normal.replace(/I/g, tile.repeat(128));
												first_path_id2_normal = first_path_id2_normal.replace(/H/g, tile.repeat(256));
												first_path_id2_normal = first_path_id2_normal.replace(/Y/g, space.repeat(1));
												first_path_id2_normal = first_path_id2_normal.replace(/X/g, space.repeat(2));
												first_path_id2_normal = first_path_id2_normal.replace(/W/g, space.repeat(4));
												first_path_id2_normal = first_path_id2_normal.replace(/V/g, space.repeat(8));
												first_path_id2_normal = first_path_id2_normal.replace(/U/g, space.repeat(16));
												first_path_id2_normal = first_path_id2_normal.replace(/T/g, space.repeat(32));
												first_path_id2_normal = first_path_id2_normal.replace(/S/g, space.repeat(64));
												first_path_id2_normal = first_path_id2_normal.replace(/R/g, space.repeat(128));
												first_path_id2_normal = first_path_id2_normal.replace(/Q/g, space.repeat(256));
												b1 = first_path_id2_normal.match(/\x3c/g);

												if (b1 == null) {
													b1 = "";
												}

												b2 = first_path_id2_normal.match(/\x3e/g);

												if (b1.length > 0 && b2 == null) {
													first_path_id2_normal = "hh<>,hh<>";
													result = `<${result}`;
												}

												special_tiles2 = [];
												first_path_id2_normal = first_path_id2_normal.split(",");

												for (i = 0; i < first_path_id2_normal.length; i++) {
													j = i + 1;

													if (first_path_id2_normal[i].includes("<") && !first_path_id2_normal[i].includes(">")) {
														special_tiles2.push(first_path_id2_normal[i]);
														first_path_id2_normal[i] = first_path_id2_normal[i].replace(first_path_id2_normal[i], "");

														if (!first_path_id2_normal[j].includes(">")) {
															first_path_id2_normal[j] = `${first_path_id2_normal[j]}<`;
														}
													} else if (first_path_id2_normal[i].includes(">") && !first_path_id2_normal[i].includes("<")) {
														special_tiles2.push(first_path_id2_normal[i]);
														first_path_id2_normal[i] = first_path_id2_normal[i].replace(first_path_id2_normal[i], "");
													} else if (first_path_id2_normal[i].includes(">") && first_path_id2_normal[i].includes("<")) {
														special_tiles2.push(first_path_id2_normal[i]);
														first_path_id2_normal[i] = first_path_id2_normal[i].replace(first_path_id2_normal[i], "");
													}
												}

												for (i = 0; i < special_tiles2.length; i++) {
													if (special_tiles2[i].lastIndexOf("<") == special_tiles2[i].length - 1) {
														special_tiles2[i] = special_tiles2[i].substr(0, special_tiles2[i].length - 1);
													}

													special_tiles2[i] = special_tiles2[i].replace(/\x3e/g, ">>");
												}

												if (special_tiles2 == "") {
													special_tiles2 = ["hh<>>", "hh<>>"];
												}

												if (special_tiles2[0].indexOf("h") == 0) {
													special_tiles2[0] = special_tiles2[0].substr(1, special_tiles2[0].length);
												}

												special_tiles21 = special_tiles2.pop();

												if (special_tiles21.includes(">")) {
													special_tiles21 = special_tiles21.substr(0, special_tiles21.length - 1);
												}

												special_tiles2.push(special_tiles21);
												special_tiles2 = special_tiles2.join();
												special_tiles2 = special_tiles2.split(">,h");

												for (i = 0; i < special_tiles2.length; i++) {
													if (special_tiles2[i].includes("h")) {
														special_tiles2[i] = "";
													} else if (special_tiles2[i].includes("i")) {
														special_tiles2[i] = "";
													} else if (special_tiles2[i].includes("j")) {
														special_tiles2[i] = "";
													} else {
														special_tiles2[i] = special_tiles2[i].replace(/k|\x3c|\x3e|\x2c/g, "");
													}
												}

												special_tiles2 = special_tiles2.map(_ref3 => {
													const length = _ref3.length;
													const x = length;
													const length_of_tile = x * multiplying2;
													let m = length_of_tile % 1;

													if (length_of_tile == 1 && m == 0) {
														m = 0;
													} else if (length_of_tile < 1.5 && length_of_tile > 1) {
														m = 1;
													} else if (length_of_tile < 2 && length_of_tile >= 1.5) {
														m = 2;
													}

													if (length_of_tile == 2) {
														m = 1;
													} else if (length_of_tile > 2 && m < 0.5) {
														m = 1;
													} else if (length_of_tile > 2 && m >= 0.5 || length_of_tile > 2 && m < 1) {
														m = 2;
													}

													const n = parseInt(length_of_tile);
													const finaled = n + m;
													return finaled;
												});
												special_tiles2_calc = 0;

												for (i = 0; i < special_tiles2.length; i++) {
													special_tiles2_calc = special_tiles2_calc + special_tiles2[i];
												}

												for (i = 0; i < first_path_id2_normal.length; i++) {
													if (first_path_id2_normal[i].includes("Y")) {
														first_path_id2_normal[i] = first_path_id2_normal[i].replace(first_path_id2_normal[i], "");
													}
												}

												first_path_id2_normal_new = first_path_id2_normal.map(_ref4 => {
													const length = _ref4.length;
													const x = length;
													const length_of_tile = x * multiplying2;
													let m = length_of_tile % 1;

													if (length_of_tile == 1 && m == 0) {
														m = 0;
													} else if (length_of_tile < 1.5 && length_of_tile > 1) {
														m = 1;
													} else if (length_of_tile < 2 && length_of_tile >= 1.5) {
														m = 2;
													}

													if (length_of_tile == 2) {
														m = 1;
													} else if (length_of_tile > 2 && m < 0.5) {
														m = 1;
													} else if (length_of_tile > 2 && m >= 0.5 || length_of_tile > 2 && m < 1) {
														m = 2;
													}

													const n = parseInt(length_of_tile);
													const finaled = n + m;
													return finaled;
												});
												first_path_id2_normal = first_path_id2_normal_new;
												first_path_id2_normal_calc = 0;

												for (i = 0; i < first_path_id2_normal.length; i++) {
													first_path_id2_normal_calc = first_path_id2_normal_calc + first_path_id2_normal[i];
												}

												first_path_id2_normal_calc = first_path_id2_normal_calc + special_tiles2_calc; //first_path_id3

												first_path_id3_normal = first_path_id3.replace(/\x3b/g, ",");
												first_path_id3_normal = first_path_id3_normal.replace(/\x2c\x2c/g, ",");
												first_path_id3_normal = first_path_id3_normal.replace(/2\x3c/g, "hh<");
												first_path_id3_normal = first_path_id3_normal.replace(/3\x3c/g, "hi<");
												first_path_id3_normal = first_path_id3_normal.replace(/5\x3c/g, "hj<");
												first_path_id3_normal = first_path_id3_normal.replace(/6\x3c/g, "hk<");
												first_path_id3_normal = first_path_id3_normal.replace(/7\x3c/g, "hk<");
												first_path_id3_normal = first_path_id3_normal.replace(/8\x3c/g, "hk<");
												first_path_id3_normal = first_path_id3_normal.replace(/9\x3c/g, "hk<");
												first_path_id3_normal = first_path_id3_normal.replace(/10\x3c/g, "hh<");
												first_path_id3_normal = first_path_id3_normal.replace(/mute|empty|A|B|C|D|E|F|G|a|b|c|d|e|f|g|0|1|2|3|4|5|6|7|8|9|\x21|\x23|\x24|\x25|\x26|\x28|\x29|\x40|\x2d|\x2e|\x5b|\x5d|\x5e|\x7b|\x7c|\x7d|\x7e/g, "");
												first_path_id3_normal = first_path_id3_normal.replace(/P/g, tile.repeat(1));
												first_path_id3_normal = first_path_id3_normal.replace(/O/g, tile.repeat(2));
												first_path_id3_normal = first_path_id3_normal.replace(/N/g, tile.repeat(4));
												first_path_id3_normal = first_path_id3_normal.replace(/M/g, tile.repeat(8));
												first_path_id3_normal = first_path_id3_normal.replace(/L/g, tile.repeat(16));
												first_path_id3_normal = first_path_id3_normal.replace(/K/g, tile.repeat(32));
												first_path_id3_normal = first_path_id3_normal.replace(/J/g, tile.repeat(64));
												first_path_id3_normal = first_path_id3_normal.replace(/I/g, tile.repeat(128));
												first_path_id3_normal = first_path_id3_normal.replace(/H/g, tile.repeat(256));
												first_path_id3_normal = first_path_id3_normal.replace(/Y/g, space.repeat(1));
												first_path_id3_normal = first_path_id3_normal.replace(/X/g, space.repeat(2));
												first_path_id3_normal = first_path_id3_normal.replace(/W/g, space.repeat(4));
												first_path_id3_normal = first_path_id3_normal.replace(/V/g, space.repeat(8));
												first_path_id3_normal = first_path_id3_normal.replace(/U/g, space.repeat(16));
												first_path_id3_normal = first_path_id3_normal.replace(/T/g, space.repeat(32));
												first_path_id3_normal = first_path_id3_normal.replace(/S/g, space.repeat(64));
												first_path_id3_normal = first_path_id3_normal.replace(/R/g, space.repeat(128));
												first_path_id3_normal = first_path_id3_normal.replace(/Q/g, space.repeat(256));
												b1 = first_path_id3_normal.match(/\x3c/g);

												if (b1 == null) {
													b1 = "";
												}

												b2 = first_path_id3_normal.match(/\x3e/g);

												if (b1.length > 0 && b2 == null) {
													first_path_id3_normal = "hh<>,hh<>";
													result = `<${result}`;
												}

												special_tiles2 = [];
												first_path_id3_normal = first_path_id3_normal.split(",");

												for (i = 0; i < first_path_id3_normal.length; i++) {
													j = i + 1;

													if (first_path_id3_normal[i].includes("<") && !first_path_id3_normal[i].includes(">")) {
														special_tiles2.push(first_path_id3_normal[i]);
														first_path_id3_normal[i] = first_path_id3_normal[i].replace(first_path_id3_normal[i], "");

														if (!first_path_id3_normal[j].includes(">")) {
															first_path_id3_normal[j] = `${first_path_id3_normal[j]}<`;
														}
													} else if (first_path_id3_normal[i].includes(">") && !first_path_id3_normal[i].includes("<")) {
														special_tiles2.push(first_path_id3_normal[i]);
														first_path_id3_normal[i] = first_path_id3_normal[i].replace(first_path_id3_normal[i], "");
													} else if (first_path_id3_normal[i].includes(">") && first_path_id3_normal[i].includes("<")) {
														special_tiles2.push(first_path_id3_normal[i]);
														first_path_id3_normal[i] = first_path_id3_normal[i].replace(first_path_id3_normal[i], "");
													}
												}

												for (i = 0; i < special_tiles2.length; i++) {
													if (special_tiles2[i].lastIndexOf("<") == special_tiles2[i].length - 1) {
														special_tiles2[i] = special_tiles2[i].substr(0, special_tiles2[i].length - 1);
													}

													special_tiles2[i] = special_tiles2[i].replace(/\x3e/g, ">>");
												}

												if (special_tiles2 == "") {
													special_tiles2 = ["hh<>>", "hh<>>"];
												}

												if (special_tiles2[0].indexOf("h") == 0) {
													special_tiles2[0] = special_tiles2[0].substr(1, special_tiles2[0].length);
												}

												special_tiles21 = special_tiles2.pop();

												if (special_tiles21.includes(">")) {
													special_tiles21 = special_tiles21.substr(0, special_tiles21.length - 1);
												}

												special_tiles2.push(special_tiles21);
												special_tiles2 = special_tiles2.join();
												special_tiles2 = special_tiles2.split(">,h");

												for (i = 0; i < special_tiles2.length; i++) {
													if (special_tiles2[i].includes("h")) {
														special_tiles2[i] = "";
													} else if (special_tiles2[i].includes("i")) {
														special_tiles2[i] = "";
													} else if (special_tiles2[i].includes("j")) {
														special_tiles2[i] = "";
													} else {
														special_tiles2[i] = special_tiles2[i].replace(/k|\x3c|\x3e|\x2c/g, "");
													}
												}

												special_tiles2 = special_tiles2.map(_ref5 => {
													const length = _ref5.length;
													const x = length;
													const length_of_tile = x * multiplying3;
													let m = length_of_tile % 1;

													if (length_of_tile == 1 && m == 0) {
														m = 0;
													} else if (length_of_tile < 1.5 && length_of_tile > 1) {
														m = 1;
													} else if (length_of_tile < 2 && length_of_tile >= 1.5) {
														m = 2;
													}

													if (length_of_tile == 2) {
														m = 1;
													} else if (length_of_tile > 2 && m < 0.5) {
														m = 1;
													} else if (length_of_tile > 2 && m >= 0.5 || length_of_tile > 2 && m < 1) {
														m = 2;
													}

													const n = parseInt(length_of_tile);
													const finaled = n + m;
													return finaled;
												});
												special_tiles2_calc = 0;

												for (i = 0; i < special_tiles2.length; i++) {
													special_tiles2_calc = special_tiles2_calc + special_tiles2[i];
												}

												for (i = 0; i < first_path_id3_normal.length; i++) {
													if (first_path_id3_normal[i].includes("Y")) {
														first_path_id3_normal[i] = first_path_id3_normal[i].replace(first_path_id3_normal[i], "");
													}
												}

												first_path_id3_normal_new = first_path_id3_normal.map(_ref6 => {
													const length = _ref6.length;
													const x = length;
													const length_of_tile = x * multiplying3;
													let m = length_of_tile % 1;

													if (length_of_tile == 1 && m == 0) {
														m = 0;
													} else if (length_of_tile < 1.5 && length_of_tile > 1) {
														m = 1;
													} else if (length_of_tile < 2 && length_of_tile >= 1.5) {
														m = 2;
													}

													if (length_of_tile == 2) {
														m = 1;
													} else if (length_of_tile > 2 && m < 0.5) {
														m = 1;
													} else if (length_of_tile > 2 && m >= 0.5 || length_of_tile > 2 && m < 1) {
														m = 2;
													}

													const n = parseInt(length_of_tile);
													const finaled = n + m;
													return finaled;
												});
												first_path_id3_normal = first_path_id3_normal_new;
												first_path_id3_normal_calc = 0;

												for (i = 0; i < first_path_id3_normal.length; i++) {
													first_path_id3_normal_calc = first_path_id3_normal_calc + first_path_id3_normal[i];
												}

												first_path_id3_normal_calc = first_path_id3_normal_calc + special_tiles2_calc;
												path_normal = first_path_id1_normal_calc + first_path_id2_normal_calc + first_path_id3_normal_calc; //calculating background tiles

												first_path_id_bg = first_path_id1.replace(/\x3b/g, ",");
												first_path_id_bg = first_path_id_bg.replace(/\x2c\x2c/g, ",");
												first_path_id_bg = first_path_id_bg.replace(/mute|empty|A|B|C|D|E|F|G|a|b|c|d|e|f|g|0|1|2|3|4|5|6|7|8|9|\x21|\x23|\x24|\x25|\x26|\x28|\x29|\x40|\x2d|\x2e|\x5b|\x5d|\x5e|\x7b|\x7c|\x7d|\x7e/g, "");
												first_path_id_bg = first_path_id_bg.replace(/\x3c|\x3e/g, "|");
												first_path_id_bg = first_path_id_bg.replace(/P/g, tile.repeat(1));
												first_path_id_bg = first_path_id_bg.replace(/O/g, tile.repeat(2));
												first_path_id_bg = first_path_id_bg.replace(/N/g, tile.repeat(4));
												first_path_id_bg = first_path_id_bg.replace(/M/g, tile.repeat(8));
												first_path_id_bg = first_path_id_bg.replace(/L/g, tile.repeat(16));
												first_path_id_bg = first_path_id_bg.replace(/K/g, tile.repeat(32));
												first_path_id_bg = first_path_id_bg.replace(/J/g, tile.repeat(64));
												first_path_id_bg = first_path_id_bg.replace(/I/g, tile.repeat(128));
												first_path_id_bg = first_path_id_bg.replace(/H/g, tile.repeat(256));
												first_path_id_bg = first_path_id_bg.replace(/Y/g, space.repeat(1));
												first_path_id_bg = first_path_id_bg.replace(/X/g, space.repeat(2));
												first_path_id_bg = first_path_id_bg.replace(/W/g, space.repeat(4));
												first_path_id_bg = first_path_id_bg.replace(/V/g, space.repeat(8));
												first_path_id_bg = first_path_id_bg.replace(/U/g, space.repeat(16));
												first_path_id_bg = first_path_id_bg.replace(/T/g, space.repeat(32));
												first_path_id_bg = first_path_id_bg.replace(/S/g, space.repeat(64));
												first_path_id_bg = first_path_id_bg.replace(/R/g, space.repeat(128));
												first_path_id_bg = first_path_id_bg.replace(/Q/g, space.repeat(256));
												first_path_id_bg = first_path_id_bg.split("|");

												for (i = 1; i < first_path_id_bg.length; i += 2) {
													first_path_id_bg[i] = first_path_id_bg[i].replace(/Y/g, "P");
													first_path_id_bg[i] = first_path_id_bg[i].replace(/\x2c/g, "");
												}

												first_path_id_bg = first_path_id_bg.join("");
												first_path_id_bg = first_path_id_bg.split(",");
												first_path_id_bg.pop();

												for (i = 1; i < id1.length; i++) {
													id1[i] = id1[i].replace(/\x3b/g, ",");
													id1[i] = id1[i].replace(/\x2c\x2c/g, ",");
													id1[i] = id1[i].replace(/mute|empty|A|B|C|D|E|F|G|a|b|c|d|e|f|g|0|1|2|3|4|5|6|7|8|9|\x21|\x23|\x24|\x25|\x26|\x28|\x29|\x40|\x2d|\x2e|\x3c|\x3e|\x5b|\x5d|\x5e|\x7b|\x7c|\x7d|\x7e/g, "");
													id1[i] = id1[i].replace(/\x2c\x2c/g, ",");
													id1[i] = id1[i].replace(/P/g, tile.repeat(1));
													id1[i] = id1[i].replace(/O/g, tile.repeat(2));
													id1[i] = id1[i].replace(/N/g, tile.repeat(4));
													id1[i] = id1[i].replace(/M/g, tile.repeat(8));
													id1[i] = id1[i].replace(/L/g, tile.repeat(16));
													id1[i] = id1[i].replace(/K/g, tile.repeat(32));
													id1[i] = id1[i].replace(/J/g, tile.repeat(64));
													id1[i] = id1[i].replace(/I/g, tile.repeat(128));
													id1[i] = id1[i].replace(/H/g, tile.repeat(256));
													id1[i] = id1[i].replace(/Y/g, space.repeat(1));
													id1[i] = id1[i].replace(/X/g, space.repeat(2));
													id1[i] = id1[i].replace(/W/g, space.repeat(4));
													id1[i] = id1[i].replace(/V/g, space.repeat(8));
													id1[i] = id1[i].replace(/U/g, space.repeat(16));
													id1[i] = id1[i].replace(/T/g, space.repeat(32));
													id1[i] = id1[i].replace(/S/g, space.repeat(64));
													id1[i] = id1[i].replace(/R/g, space.repeat(128));
													id1[i] = id1[i].replace(/Q/g, space.repeat(256));
													id1_a = id1[i].split(",");

													for (j = 0; j < id1_a.length; j++) {
														id1_a[j] = id1_a[j].replace(/Y/g, "0,");

														if (id1_a[j].indexOf("P") == 0) {
															id1_a[j] = id1_a[j].replace(/P/g, "0,");
															id1_a[j] = `1,${id1_a[j].substr(2)}`;
														}
													}

													id1[i] = id1_a.join("");
													id1_a = id1[i].split(",");

													for (j = 0; j < id1_a.length; j++) {
														id1_a[j] = parseInt(id1_a[j]);

														if (isNaN(id1_a[j])) {
															id1_a[j] = 0;
														}
													}

													id1[i] = id1_a;
												}

												id1.shift();
												id1_bg = _.unzipWith(id1, _.add);

												for (i = 0; i < id1_bg.length; i++) {
													if (id1_bg[i] > 0) {
														id1_bg[i] = 1;
													}
												}

												id1_bg = id1_bg.join("");

												for (i = 0; i < first_path_id_bg.length; i++) {
													if (first_path_id_bg[i].includes("Y")) {
														first_path_id_bg[i] = `|${first_path_id_bg[i]}|`;
													}
												}

												first_path_id_bg = first_path_id_bg.join("");
												first_path_id_bg = first_path_id_bg.replace(/\x7c\x7c/g, "|");
												first_path_id_bg = first_path_id_bg.split("|");
												array_a = [];

												for (i = 0; i < first_path_id_bg.length; i++) {
													k = first_path_id_bg[i].length;
													first_path_id_bg[i] = first_path_id_bg[i].replace(/P/g, "2");
													first_path_id_bg[i] = first_path_id_bg[i].replace(/Y/g, "0");
													id1_bg = `${id1_bg.substr(0, k)},${id1_bg.substr(k)}`;
													id1_bg = id1_bg.split(",");
													array_a.push(id1_bg[0]);
													id1_bg = id1_bg[1];
												}

												for (i = 0; i < first_path_id_bg.length; i++) {
													if (first_path_id_bg[i].includes("2")) {
														first_path_id_bg[i] = first_path_id_bg[i].replace(/2/g, "");
													} else if (first_path_id_bg[i].includes("0") && array_a[i].includes("1")) {
														first_path_id_bg[i] = first_path_id_bg[i].replace(/0/g, "P");
													} else {
														first_path_id_bg[i] = "";
													}
												}

												first_path_id_bg_new = first_path_id_bg.map(_ref7 => {
													const length = _ref7.length;
													const x = length;
													const length_of_tile = x * multiplying1;
													let m = length_of_tile % 1;

													if (length_of_tile == 1 && m == 0) {
														m = 0;
													} else if (length_of_tile < 1.5 && length_of_tile > 1) {
														m = 1;
													} else if (length_of_tile < 2 && length_of_tile >= 1.5) {
														m = 2;
													}

													if (length_of_tile == 2) {
														m = 1;
													} else if (length_of_tile > 2 && m < 0.5) {
														m = 1;
													} else if (length_of_tile > 2 && m >= 0.5 || length_of_tile > 2 && m < 1) {
														m = 2;
													}

													const n = parseInt(length_of_tile);
													const finaled = n + m;
													return finaled;
												});
												first_path_id_bg = first_path_id_bg_new;
												first_path_id_normal_calc = 0;

												for (i = 0; i < first_path_id_bg.length; i++) {
													first_path_id_normal_calc = first_path_id_normal_calc + first_path_id_bg[i];
												}

												second_path_id_bg = first_path_id2.replace(/\x3b/g, ",");
												second_path_id_bg = second_path_id_bg.replace(/\x2c\x2c/g, ",");
												second_path_id_bg = second_path_id_bg.replace(/mute|empty|A|B|C|D|E|F|G|a|b|c|d|e|f|g|0|1|2|3|4|5|6|7|8|9|\x21|\x23|\x24|\x25|\x26|\x28|\x29|\x40|\x2d|\x2e|\x5b|\x5d|\x5e|\x7b|\x7c|\x7d|\x7e/g, "");
												second_path_id_bg = second_path_id_bg.replace(/\x3c|\x3e/g, "|");
												second_path_id_bg = second_path_id_bg.replace(/P/g, tile.repeat(1));
												second_path_id_bg = second_path_id_bg.replace(/O/g, tile.repeat(2));
												second_path_id_bg = second_path_id_bg.replace(/N/g, tile.repeat(4));
												second_path_id_bg = second_path_id_bg.replace(/M/g, tile.repeat(8));
												second_path_id_bg = second_path_id_bg.replace(/L/g, tile.repeat(16));
												second_path_id_bg = second_path_id_bg.replace(/K/g, tile.repeat(32));
												second_path_id_bg = second_path_id_bg.replace(/J/g, tile.repeat(64));
												second_path_id_bg = second_path_id_bg.replace(/I/g, tile.repeat(128));
												second_path_id_bg = second_path_id_bg.replace(/H/g, tile.repeat(256));
												second_path_id_bg = second_path_id_bg.replace(/Y/g, space.repeat(1));
												second_path_id_bg = second_path_id_bg.replace(/X/g, space.repeat(2));
												second_path_id_bg = second_path_id_bg.replace(/W/g, space.repeat(4));
												second_path_id_bg = second_path_id_bg.replace(/V/g, space.repeat(8));
												second_path_id_bg = second_path_id_bg.replace(/U/g, space.repeat(16));
												second_path_id_bg = second_path_id_bg.replace(/T/g, space.repeat(32));
												second_path_id_bg = second_path_id_bg.replace(/S/g, space.repeat(64));
												second_path_id_bg = second_path_id_bg.replace(/R/g, space.repeat(128));
												second_path_id_bg = second_path_id_bg.replace(/Q/g, space.repeat(256));
												second_path_id_bg = second_path_id_bg.split("|");

												for (i = 1; i < second_path_id_bg.length; i += 2) {
													second_path_id_bg[i] = second_path_id_bg[i].replace(/Y/g, "P");
													second_path_id_bg[i] = second_path_id_bg[i].replace(/\x2c/g, "");
												}

												second_path_id_bg = second_path_id_bg.join("");
												second_path_id_bg = second_path_id_bg.split(",");
												second_path_id_bg.pop();

												for (i = 1; i < id2.length; i++) {
													id2[i] = id2[i].replace(/\x3b/g, ",");
													id2[i] = id2[i].replace(/\x2c\x2c/g, ",");
													id2[i] = id2[i].replace(/mute|empty|A|B|C|D|E|F|G|a|b|c|d|e|f|g|0|1|2|3|4|5|6|7|8|9|\x21|\x23|\x24|\x25|\x26|\x28|\x29|\x40|\x2d|\x2e|\x3c|\x3e|\x5b|\x5d|\x5e|\x7b|\x7c|\x7d|\x7e/g, "");
													id2[i] = id2[i].replace(/\x2c\x2c/g, ",");
													id2[i] = id2[i].replace(/P/g, tile.repeat(1));
													id2[i] = id2[i].replace(/O/g, tile.repeat(2));
													id2[i] = id2[i].replace(/N/g, tile.repeat(4));
													id2[i] = id2[i].replace(/M/g, tile.repeat(8));
													id2[i] = id2[i].replace(/L/g, tile.repeat(16));
													id2[i] = id2[i].replace(/K/g, tile.repeat(32));
													id2[i] = id2[i].replace(/J/g, tile.repeat(64));
													id2[i] = id2[i].replace(/I/g, tile.repeat(128));
													id2[i] = id2[i].replace(/H/g, tile.repeat(256));
													id2[i] = id2[i].replace(/Y/g, space.repeat(1));
													id2[i] = id2[i].replace(/X/g, space.repeat(2));
													id2[i] = id2[i].replace(/W/g, space.repeat(4));
													id2[i] = id2[i].replace(/V/g, space.repeat(8));
													id2[i] = id2[i].replace(/U/g, space.repeat(16));
													id2[i] = id2[i].replace(/T/g, space.repeat(32));
													id2[i] = id2[i].replace(/S/g, space.repeat(64));
													id2[i] = id2[i].replace(/R/g, space.repeat(128));
													id2[i] = id2[i].replace(/Q/g, space.repeat(256));
													id2_a = id2[i].split(",");

													for (j = 0; j < id2_a.length; j++) {
														id2_a[j] = id2_a[j].replace(/Y/g, "0,");

														if (id2_a[j].indexOf("P") == 0) {
															id2_a[j] = id2_a[j].replace(/P/g, "0,");
															id2_a[j] = `1,${id2_a[j].substr(2)}`;
														}
													}

													id2[i] = id2_a.join("");
													id2_a = id2[i].split(",");

													for (j = 0; j < id2_a.length; j++) {
														id2_a[j] = parseInt(id2_a[j]);

														if (isNaN(id2_a[j])) {
															id2_a[j] = 0;
														}
													}

													id2[i] = id2_a;
												}

												id2.shift();
												id2_bg = _.unzipWith(id2, _.add);

												for (i = 0; i < id2_bg.length; i++) {
													if (id2_bg[i] > 0) {
														id2_bg[i] = 1;
													}
												}

												id2_bg = id2_bg.join("");

												for (i = 0; i < second_path_id_bg.length; i++) {
													if (second_path_id_bg[i].includes("Y")) {
														second_path_id_bg[i] = `|${second_path_id_bg[i]}|`;
													}
												}

												second_path_id_bg = second_path_id_bg.join("");
												second_path_id_bg = second_path_id_bg.replace(/\x7c\x7c/g, "|");
												second_path_id_bg = second_path_id_bg.split("|");
												array_a = [];

												for (i = 0; i < second_path_id_bg.length; i++) {
													k = second_path_id_bg[i].length;
													second_path_id_bg[i] = second_path_id_bg[i].replace(/P/g, "2");
													second_path_id_bg[i] = second_path_id_bg[i].replace(/Y/g, "0");
													id2_bg = `${id2_bg.substr(0, k)},${id2_bg.substr(k)}`;
													id2_bg = id2_bg.split(",");
													array_a.push(id2_bg[0]);
													id2_bg = id2_bg[1];
												}

												for (i = 0; i < second_path_id_bg.length; i++) {
													if (second_path_id_bg[i].includes("2")) {
														second_path_id_bg[i] = second_path_id_bg[i].replace(/2/g, "");
													} else if (second_path_id_bg[i].includes("0") && array_a[i].includes("1")) {
														second_path_id_bg[i] = second_path_id_bg[i].replace(/0/g, "P");
													} else {
														second_path_id_bg[i] = "";
													}
												}

												second_path_id_bg_new = second_path_id_bg.map(_ref8 => {
													const length = _ref8.length;
													const x = length;
													const length_of_tile = x * multiplying2;
													let m = length_of_tile % 1;

													if (length_of_tile == 1 && m == 0) {
														m = 0;
													} else if (length_of_tile < 1.5 && length_of_tile > 1) {
														m = 1;
													} else if (length_of_tile < 2 && length_of_tile >= 1.5) {
														m = 2;
													}

													if (length_of_tile == 2) {
														m = 1;
													} else if (length_of_tile > 2 && m < 0.5) {
														m = 1;
													} else if (length_of_tile > 2 && m >= 0.5 || length_of_tile > 2 && m < 1) {
														m = 2;
													}

													const n = parseInt(length_of_tile);
													const finaled = n + m;
													return finaled;
												});
												second_path_id_bg = second_path_id_bg_new;
												second_path_id_normal_calc = 0;

												for (i = 0; i < second_path_id_bg.length; i++) {
													second_path_id_normal_calc = second_path_id_normal_calc + second_path_id_bg[i];
												}

												third_path_id_bg = first_path_id3.replace(/\x3b/g, ",");
												third_path_id_bg = third_path_id_bg.replace(/\x2c\x2c/g, ",");
												third_path_id_bg = third_path_id_bg.replace(/mute|empty|A|B|C|D|E|F|G|a|b|c|d|e|f|g|0|1|2|3|4|5|6|7|8|9|\x21|\x23|\x24|\x25|\x26|\x28|\x29|\x40|\x2d|\x2e|\x5b|\x5d|\x5e|\x7b|\x7c|\x7d|\x7e/g, "");
												third_path_id_bg = third_path_id_bg.replace(/\x3c|\x3e/g, "|");
												third_path_id_bg = third_path_id_bg.replace(/P/g, tile.repeat(1));
												third_path_id_bg = third_path_id_bg.replace(/O/g, tile.repeat(2));
												third_path_id_bg = third_path_id_bg.replace(/N/g, tile.repeat(4));
												third_path_id_bg = third_path_id_bg.replace(/M/g, tile.repeat(8));
												third_path_id_bg = third_path_id_bg.replace(/L/g, tile.repeat(16));
												third_path_id_bg = third_path_id_bg.replace(/K/g, tile.repeat(32));
												third_path_id_bg = third_path_id_bg.replace(/J/g, tile.repeat(64));
												third_path_id_bg = third_path_id_bg.replace(/I/g, tile.repeat(128));
												third_path_id_bg = third_path_id_bg.replace(/H/g, tile.repeat(256));
												third_path_id_bg = third_path_id_bg.replace(/Y/g, space.repeat(1));
												third_path_id_bg = third_path_id_bg.replace(/X/g, space.repeat(2));
												third_path_id_bg = third_path_id_bg.replace(/W/g, space.repeat(4));
												third_path_id_bg = third_path_id_bg.replace(/V/g, space.repeat(8));
												third_path_id_bg = third_path_id_bg.replace(/U/g, space.repeat(16));
												third_path_id_bg = third_path_id_bg.replace(/T/g, space.repeat(32));
												third_path_id_bg = third_path_id_bg.replace(/S/g, space.repeat(64));
												third_path_id_bg = third_path_id_bg.replace(/R/g, space.repeat(128));
												third_path_id_bg = third_path_id_bg.replace(/Q/g, space.repeat(256));
												third_path_id_bg = third_path_id_bg.split("|");

												for (i = 1; i < third_path_id_bg.length; i += 2) {
													third_path_id_bg[i] = third_path_id_bg[i].replace(/Y/g, "P");
													third_path_id_bg[i] = third_path_id_bg[i].replace(/\x2c/g, "");
												}

												third_path_id_bg = third_path_id_bg.join("");
												third_path_id_bg = third_path_id_bg.split(",");
												third_path_id_bg.pop();

												for (i = 1; i < id3.length; i++) {
													id3[i] = id3[i].replace(/\x3b/g, ",");
													id3[i] = id3[i].replace(/\x2c\x2c/g, ",");
													id3[i] = id3[i].replace(/mute|empty|A|B|C|D|E|F|G|a|b|c|d|e|f|g|0|1|2|3|4|5|6|7|8|9|\x21|\x23|\x24|\x25|\x26|\x28|\x29|\x40|\x2d|\x2e|\x3c|\x3e|\x5b|\x5d|\x5e|\x7b|\x7c|\x7d|\x7e/g, "");
													id3[i] = id3[i].replace(/\x2c\x2c/g, ",");
													id3[i] = id3[i].replace(/P/g, tile.repeat(1));
													id3[i] = id3[i].replace(/O/g, tile.repeat(2));
													id3[i] = id3[i].replace(/N/g, tile.repeat(4));
													id3[i] = id3[i].replace(/M/g, tile.repeat(8));
													id3[i] = id3[i].replace(/L/g, tile.repeat(16));
													id3[i] = id3[i].replace(/K/g, tile.repeat(32));
													id3[i] = id3[i].replace(/J/g, tile.repeat(64));
													id3[i] = id3[i].replace(/I/g, tile.repeat(128));
													id3[i] = id3[i].replace(/H/g, tile.repeat(256));
													id3[i] = id3[i].replace(/Y/g, space.repeat(1));
													id3[i] = id3[i].replace(/X/g, space.repeat(2));
													id3[i] = id3[i].replace(/W/g, space.repeat(4));
													id3[i] = id3[i].replace(/V/g, space.repeat(8));
													id3[i] = id3[i].replace(/U/g, space.repeat(16));
													id3[i] = id3[i].replace(/T/g, space.repeat(32));
													id3[i] = id3[i].replace(/S/g, space.repeat(64));
													id3[i] = id3[i].replace(/R/g, space.repeat(128));
													id3[i] = id3[i].replace(/Q/g, space.repeat(256));
													id3_a = id3[i].split(",");

													for (j = 0; j < id3_a.length; j++) {
														id3_a[j] = id3_a[j].replace(/Y/g, "0,");

														if (id3_a[j].indexOf("P") == 0) {
															id3_a[j] = id3_a[j].replace(/P/g, "0,");
															id3_a[j] = `1,${id3_a[j].substr(2)}`;
														}
													}

													id3[i] = id3_a.join("");
													id3_a = id3[i].split(",");

													for (j = 0; j < id3_a.length; j++) {
														id3_a[j] = parseInt(id3_a[j]);

														if (isNaN(id3_a[j])) {
															id3_a[j] = 0;
														}
													}

													id3[i] = id3_a;
												}

												id3.shift();
												id3_bg = _.unzipWith(id3, _.add);

												for (i = 0; i < id3_bg.length; i++) {
													if (id3_bg[i] > 0) {
														id3_bg[i] = 1;
													}
												}

												id3_bg = id3_bg.join("");

												for (i = 0; i < third_path_id_bg.length; i++) {
													if (third_path_id_bg[i].includes("Y")) {
														third_path_id_bg[i] = `|${third_path_id_bg[i]}|`;
													}
												}

												third_path_id_bg = third_path_id_bg.join("");
												third_path_id_bg = third_path_id_bg.replace(/\x7c\x7c/g, "|");
												third_path_id_bg = third_path_id_bg.split("|");
												array_a = [];

												for (i = 0; i < third_path_id_bg.length; i++) {
													k = third_path_id_bg[i].length;
													third_path_id_bg[i] = third_path_id_bg[i].replace(/P/g, "2");
													third_path_id_bg[i] = third_path_id_bg[i].replace(/Y/g, "0");
													id3_bg = `${id3_bg.substr(0, k)},${id3_bg.substr(k)}`;
													id3_bg = id3_bg.split(",");
													array_a.push(id3_bg[0]);
													id3_bg = id3_bg[1];
												}

												for (i = 0; i < third_path_id_bg.length; i++) {
													if (third_path_id_bg[i].includes("2")) {
														third_path_id_bg[i] = third_path_id_bg[i].replace(/2/g, "");
													} else if (third_path_id_bg[i].includes("0") && array_a[i].includes("1")) {
														third_path_id_bg[i] = third_path_id_bg[i].replace(/0/g, "P");
													} else {
														third_path_id_bg[i] = "";
													}
												}

												third_path_id_bg_new = third_path_id_bg.map(_ref9 => {
													const length = _ref9.length;
													const x = length;
													const length_of_tile = x * multiplying3;
													let m = length_of_tile % 1;

													if (length_of_tile == 1 && m == 0) {
														m = 0;
													} else if (length_of_tile < 1.5 && length_of_tile > 1) {
														m = 1;
													} else if (length_of_tile < 2 && length_of_tile >= 1.5) {
														m = 2;
													}

													if (length_of_tile == 2) {
														m = 1;
													} else if (length_of_tile > 2 && m < 0.5) {
														m = 1;
													} else if (length_of_tile > 2 && m >= 0.5 || length_of_tile > 2 && m < 1) {
														m = 2;
													}

													const n = parseInt(length_of_tile);
													const finaled = n + m;
													return finaled;
												});
												third_path_id_bg = third_path_id_bg_new;
												third_path_id_normal_calc = 0;

												for (i = 0; i < third_path_id_bg.length; i++) {
													third_path_id_normal_calc = third_path_id_normal_calc + third_path_id_bg[i];
												}

												all_bg_points = first_path_id_normal_calc + second_path_id_normal_calc + third_path_id_normal_calc; //all points

												all_points = parseInt(path_special) + parseInt(path_normal) + parseInt(all_bg_points);
												document.getElementById("code1_result").innerHTML = `<strongr><strong style="color: lime">每轮分数：</strong><strong style="color: gold">${all_points}</strong>`;
												let star1 = first_path_id1;
												let star2 = first_path_id2;
												let star3 = first_path_id3;
												const full_lap = star1 + star2 + star3;
												doubles_amount = (full_lap.match(/5\x3c/g) || []).length;
												combo_amount = (full_lap.match(/3\x3c/g) || []).length;
												slide1_amount = (full_lap.match(/7\x3c/g) || []).length;
												slide2_amount = (full_lap.match(/8\x3c/g) || []).length;
												slide_amount = slide1_amount + slide2_amount;
												burst_amount = (full_lap.match(/10\x3c/g) || []).length;
												document.getElementById("tiles_info").innerHTML = `<strongr><strong style="color: lime">双黑块：<strong style="color: gold">${doubles_amount}</strong>，狂戳块：<strong style="color: gold">${combo_amount}</strong>，滑块：<strong style="color: gold">${slide_amount}</strong>，爆裂块：<strong style="color: gold">${burst_amount}</strong></strong>`;

												if (basebeats1 <= 0 || basebeats2 <= 0 || basebeats3 <= 0) {
													alert("Fatal error: baseBeats can't be lower or equal to 0!");
												} else {
													const speed1 = parseFloat(bpm1 / basebeats1 / 60);
													const speed2 = parseFloat(bpm2 / basebeats2 / 60);
													const speed3 = parseFloat(bpm3 / basebeats3 / 60);
													document.getElementById("speed_info").innerHTML = `<strongr><strong style="color: lime">速度：<strong style="color: gold">${speed1.toFixed(3)}</strong>, <strong style="color: gold">${speed2.toFixed(3)}</strong>, <strong style="color: gold">${speed3.toFixed(3)}</strong></strong>`;
													star1 = star1.replace(/1|2|3|4|5|6|7|8|9|0|\x21|\x23|\x24|\x25|\x26|\x28|\x29|\x40|\x2c|\x2d|\x2e|\x3b|\x3c|\x3e|\x5b|\x5d|\x5e|\x7b|\x7d|\x7e|mute|empty|A|B|C|D|E|F|G|a|b|c|d|e|f|g/g, "");
													star1 = star1.replace(/Q/g, "RR");
													star1 = star1.replace(/R/g, "SS");
													star1 = star1.replace(/S/g, "TT");
													star1 = star1.replace(/T/g, "UU");
													star1 = star1.replace(/U/g, "VV");
													star1 = star1.replace(/V/g, "WW");
													star1 = star1.replace(/W/g, "XX");
													star1 = star1.replace(/X/g, "YY");
													star1 = star1.replace(/Y/g, "P");
													star1 = star1.replace(/H/g, "II");
													star1 = star1.replace(/I/g, "JJ");
													star1 = star1.replace(/J/g, "KK");
													star1 = star1.replace(/K/g, "LL");
													star1 = star1.replace(/L/g, "MM");
													star1 = star1.replace(/M/g, "NN");
													star1 = star1.replace(/N/g, "OO");
													star1 = star1.replace(/O/g, "PP");

													if (star1 === "") {
														star1_final = 0;
													} else {
														star1_final = star1.match(/P/gi).length;
													}

													r1 = 1 * star1_final * multiplying1;

													if (Number.isInteger(r1)) {
														r1 = r1;
													} else {
														r1 = (1 * r1).toFixed(3);
													}

													star2 = star2.replace(/1|2|3|4|5|6|7|8|9|0|\x21|\x23|\x24|\x25|\x26|\x28|\x29|\x40|\x2c|\x2d|\x2e|\x3b|\x3c|\x3e|\x5b|\x5d|\x5e|\x7b|\x7d|\x7e|mute|empty|A|B|C|D|E|F|G|a|b|c|d|e|f|g/g, "");
													star2 = star2.replace(/Q/g, "RR");
													star2 = star2.replace(/R/g, "SS");
													star2 = star2.replace(/S/g, "TT");
													star2 = star2.replace(/T/g, "UU");
													star2 = star2.replace(/U/g, "VV");
													star2 = star2.replace(/V/g, "WW");
													star2 = star2.replace(/W/g, "XX");
													star2 = star2.replace(/X/g, "YY");
													star2 = star2.replace(/Y/g, "P");
													star2 = star2.replace(/H/g, "II");
													star2 = star2.replace(/I/g, "JJ");
													star2 = star2.replace(/J/g, "KK");
													star2 = star2.replace(/K/g, "LL");
													star2 = star2.replace(/L/g, "MM");
													star2 = star2.replace(/M/g, "NN");
													star2 = star2.replace(/N/g, "OO");
													star2 = star2.replace(/O/g, "PP");

													if (star2 === "") {
														star2_final = 0;
													} else {
														star2_final = star2.match(/P/gi).length;
													}

													r2 = 1 * star2_final * multiplying2;

													if (Number.isInteger(r2)) {
														r2 = r2;
													} else {
														r2 = (1 * r2).toFixed(3);
													}

													star3 = star3.replace(/1|2|3|4|5|6|7|8|9|0|\x21|\x23|\x24|\x25|\x26|\x28|\x29|\x40|\x2c|\x2d|\x2e|\x3b|\x3c|\x3e|\x5b|\x5d|\x5e|\x7b|\x7d|\x7e|mute|empty|A|B|C|D|E|F|G|a|b|c|d|e|f|g/g, "");
													star3 = star3.replace(/Q/g, "RR");
													star3 = star3.replace(/R/g, "SS");
													star3 = star3.replace(/S/g, "TT");
													star3 = star3.replace(/T/g, "UU");
													star3 = star3.replace(/U/g, "VV");
													star3 = star3.replace(/V/g, "WW");
													star3 = star3.replace(/W/g, "XX");
													star3 = star3.replace(/X/g, "YY");
													star3 = star3.replace(/Y/g, "P");
													star3 = star3.replace(/H/g, "II");
													star3 = star3.replace(/I/g, "JJ");
													star3 = star3.replace(/J/g, "KK");
													star3 = star3.replace(/K/g, "LL");
													star3 = star3.replace(/L/g, "MM");
													star3 = star3.replace(/M/g, "NN");
													star3 = star3.replace(/N/g, "OO");
													star3 = star3.replace(/O/g, "PP");

													if (star3 === "") {
														star3_final = 0;
													} else {
														star3_final = star3.match(/P/gi).length;
													}

													r3 = 1 * star3_final * multiplying3;

													if (Number.isInteger(r3)) {
														r3 = r3;
													} else {
														r3 = (1 * r3).toFixed(3);
													}

													if (isNaN(r1) || isNaN(r2) || isNaN(r3)) {
														alert("Fatal error: check code");
													} else {
														s1_duration = r1 / speed1;
														s2_duration = r2 / speed2;
														s3_duration = r3 / speed3;
														duration_main = s1_duration + s2_duration + s3_duration;
														hrs = ~~(duration_main / 3600);
														hrs = parseInt(hrs * 1);

														if (hrs < 1) {
															hrs = "";
														} else {
															hrs = `${hrs}小时`;
														}

														mins = ~~(duration_main % 3600 / 60);
														mins = parseInt(mins * 1);
														secs = (duration_main % 60).toFixed(0);

														if (secs < 1) {
															secs = "";
														} else if (secs == 60) {
															secs = "";
															mins = mins + 1;
														} else {
															secs = `${secs}秒`;
														}

														if (mins < 1) {
															mins = "";
														} else {
															mins = `${mins}分`;
														}

														if (hrs === "" && mins === "" && secs === "") {
															document.getElementById("code_result").innerHTML = "<strong style=\"color: lime\">歌曲时长：<strong style=\"color: gold\">低于1秒</strong></strong>";
														} else if (mins === "" && secs === "") {
															document.getElementById("code_result").innerHTML = `<strong style="color: lime">歌曲时长：<strong style="color: gold">${hrs}</strong></strong>`;
														} else if (secs === "") {
															document.getElementById("code_result").innerHTML = `<strong style="color: lime">歌曲时长：<strong style="color: gold">${hrs}${mins}钟</strong></strong>`;
														} else {
															document.getElementById("code_result").innerHTML = `<strong style="color: lime">歌曲时长：<strong style="color: gold">${hrs}${mins}${secs}</strong></strong>`;
														}
													}
												}
											}
										}
									}
								}
							}
						}
					}
				}
			}
		}
	}
}

function containsNonLatinCodepoints(s) {
	return /[^\u0000-\u00ff]/.test(s);
}

function spaces(s) {
	return /[^\u0051-\u0059]/.test(s);
}

function tiles(s) {
	return /[^\u0048-\u0050]/.test(s);
}

function check_errors(path1, paths, multiplying) {
	path1 = path1.replace(/(?:\x2c\x3b|\x2c|\x3b)/g, ',');
	paths = paths.replace(/(?:\x2c\x3b|\x2c|\x3b)/g, ',');
	paths = paths.split(",");
	result = "";
	lastEl = paths.pop();

	if (lastEl !== "") {
		result = lastEl;
	}

	for (i = 0; i < paths.length; i++) {
		if (paths[i].includes("2<>") || paths[i].includes("3<>") || paths[i].includes("5<>") || paths[i].includes("6<>") || paths[i].includes("7<>") || paths[i].includes("8<>") || paths[i].includes("9<>") || paths[i].includes("10<>")) {
			result = paths[i];
		}
	}

	for (i = 0; i < paths.length; i++) {
		a1 = paths[i].indexOf("<");
		a2 = paths[i].lastIndexOf(">");

		if (a2 == paths[i].length - 1) {
			paths[i] = paths[i].substr(0, paths[i].length - 1);
		}

		if (a1 != -1) {
			paths[i] = paths[i].substr(a1 + 1, paths[i].length);
		}
	}

	result_tile = "";
	result_tile1 = "";

	for (i = 0; i < paths.length; i++) {
		a1 = paths[i].indexOf("(");
		a1_match = paths[i].match(/\x28/g);

		if (a1_match == null) {
			a1_match = "(";
		}

		a2 = paths[i].indexOf("]");
		a2_match = paths[i].match(/\x5d/g);

		if (a2_match == null) {
			a2_match = "]";
		}

		a3 = paths[i].indexOf(")");
		a3_match = paths[i].match(/\x29/g);

		if (a3_match == null) {
			a3_match = ")";
		}

		a4 = paths[i].indexOf("[");
		a4_match = paths[i].match(/\x5b/g);

		if (a4_match == null) {
			a4_match = "[";
		}

		a_match = a1_match + a2_match + a3_match + a4_match;
		a4 = a4 - 1;

		if (paths[i].indexOf("(") > 0) {
			result = paths[i];
		} else if (paths[i].includes("\"") || paths[i].includes("\'") || paths[i].includes("*") || paths[i].includes("?") || paths[i].includes("|") || paths[i].includes("+") || paths[i].includes("_") || paths[i].includes("=") || paths[i].includes(":") || paths[i].includes("`") || paths[i].includes("\\") || paths[i].includes("Z") || paths[i].includes("z")) {
			result = paths[i];
		} else if (paths[i].includes("\r") || paths[i].includes("\n")) {
			result = "used enter";
		} else if (paths[i].includes("Q[") || paths[i].includes("R[") || paths[i].includes("S[") || paths[i].includes("T[") || paths[i].includes("U[") || paths[i].includes("V[") || paths[i].includes("W[") || paths[i].includes("X[") || paths[i].includes("Y[")) {
			result = paths[i];
		} else if (containsNonLatinCodepoints(paths[i]) == true) {
			result = paths[i];
		} else if (a1 == 0 && !paths[i].includes(")[")) {
			result = paths[i];
		} else if (a1 == -1 && paths[i].includes(")[")) {
			result = paths[i];
		} else if (a2 == -1 && paths[i].includes("[")) {
			result = paths[i];
		} else if (paths[i].includes(")]")) {
			result = paths[i];
		} else if (a3 != a4 && a3 > -1 && a4 > -1) {
			result = paths[i];
		} else if (a4 == -1) {
			result = paths[i];
		} else if (a_match.match(/\x28/g).length > 1 || a_match.match(/\x29/g).length > 1 || a_match.match(/\x5b/g).length > 1 || a_match.match(/\x5d/g).length > 1) {
			result = paths[i];
		} else {
			a5 = paths[i].indexOf("{");
			a6 = paths[i].indexOf("}");
			a6 = a6 - 2;
			effects = paths[i].substr(a5, a6 + 2);

			if (a5 != a6 && a5 > -1 && a6 > -1) {
				result = paths[i];
			}

			if (a5 == -1 && a6 == -3) {
				effects = "{1}";
			}

			if (effects === "{1}") {
				paths[i] = paths[i].substr(0, a5) + paths[i].substr(a6 + 3, paths[i].length);
			}

			if (effects === "{2}") {
				effects = "{1}";
				paths[i] = paths[i].substr(0, a5) + paths[i].substr(a6 + 3, paths[i].length);
			}

			if (effects === "{3}") {
				effects = "{1}";
				paths[i] = paths[i].substr(0, a5) + paths[i].substr(a6 + 3, paths[i].length);
			}

			if (effects === "{4}") {
				effects = "{1}";
				paths[i] = paths[i].substr(0, a5) + paths[i].substr(a6 + 3, paths[i].length);
			}

			if (effects === "{5}") {
				effects = "{1}";
				paths[i] = paths[i].substr(0, a5) + paths[i].substr(a6 + 3, paths[i].length);
			}

			if (effects === "{6}") {
				effects = "{1}";
				paths[i] = paths[i].substr(0, a5) + paths[i].substr(a6 + 3, paths[i].length);
			}

			if (effects === "{7}") {
				effects = "{1}";
				paths[i] = paths[i].substr(0, a5) + paths[i].substr(a6 + 3, paths[i].length);
			}

			if (effects === "{8}") {
				effects = "{1}";
				paths[i] = paths[i].substr(0, a5) + paths[i].substr(a6 + 3, paths[i].length);
			}

			if (effects === "{9}") {
				effects = "{1}";
				paths[i] = paths[i].substr(0, a5) + paths[i].substr(a6 + 3, paths[i].length);
			}

			if (effects !== "{1}") {
				result = paths[i];
			} else {
				if (paths[i].indexOf("(") != 0 && paths[i].includes(".")) {
					result = paths[i];
				} else if (paths[i].indexOf("(") != 0 && paths[i].includes("~")) {
					result = paths[i];
				} else if (paths[i].indexOf("(") != 0 && paths[i].includes("!")) {
					result = paths[i];
				} else if (paths[i].indexOf("(") != 0 && paths[i].includes("@")) {
					result = paths[i];
				} else if (paths[i].indexOf("(") != 0 && paths[i].includes("$")) {
					result = paths[i];
				} else if (paths[i].indexOf("(") != 0 && paths[i].includes("%")) {
					result = paths[i];
				} else if (paths[i].indexOf("(") != 0 && paths[i].includes("^")) {
					result = paths[i];
				} else if (paths[i].indexOf("(") != 0 && paths[i].includes("&")) {
					result = paths[i];
				} else {
					if (paths[i].indexOf("Q") == 0 || paths[i].indexOf("R") == 0 || paths[i].indexOf("S") == 0 || paths[i].indexOf("T") == 0 || paths[i].indexOf("U") == 0 || paths[i].indexOf("V") == 0 || paths[i].indexOf("W") == 0 || paths[i].indexOf("X") == 0 || paths[i].indexOf("Y") == 0) {
						if (spaces(paths[i]) == true) {
							result = paths[i];
						}
					} else if (paths[i].indexOf("(") == 0) {
						if (paths[i].indexOf("Q") == 1 || paths[i].indexOf("R") == 1 || paths[i].indexOf("S") == 1 || paths[i].indexOf("T") == 1 || paths[i].indexOf("U") == 1 || paths[i].indexOf("V") == 1 || paths[i].indexOf("W") == 1 || paths[i].indexOf("X") == 1 || paths[i].indexOf("Y") == 1) {
							if (paths[i].includes("~") && paths[i].includes("!")) {
								result = paths[i];
							} else if (paths[i].includes("~") && paths[i].includes("@")) {
								result = paths[i];
							} else if (paths[i].includes("~") && paths[i].includes("$")) {
								result = paths[i];
							} else if (paths[i].includes("~") && paths[i].includes("%")) {
								result = paths[i];
							} else if (paths[i].includes("~") && paths[i].includes("^")) {
								result = paths[i];
							} else if (paths[i].includes("~") && paths[i].includes("&")) {
								result = paths[i];
							} else if (paths[i].includes("!") && paths[i].includes("@")) {
								result = paths[i];
							} else if (paths[i].includes("!") && paths[i].includes("$")) {
								result = paths[i];
							} else if (paths[i].includes("!") && paths[i].includes("%")) {
								result = paths[i];
							} else if (paths[i].includes("!") && paths[i].includes("^")) {
								result = paths[i];
							} else if (paths[i].includes("!") && paths[i].includes("&")) {
								result = paths[i];
							} else if (paths[i].includes("@") && paths[i].includes("$")) {
								result = paths[i];
							} else if (paths[i].includes("@") && paths[i].includes("%")) {
								result = paths[i];
							} else if (paths[i].includes("@") && paths[i].includes("^")) {
								result = paths[i];
							} else if (paths[i].includes("@") && paths[i].includes("&")) {
								result = paths[i];
							} else if (paths[i].includes("$") && paths[i].includes("%")) {
								result = paths[i];
							} else if (paths[i].includes("$") && paths[i].includes("^")) {
								result = paths[i];
							} else if (paths[i].includes("$") && paths[i].includes("&")) {
								result = paths[i];
							} else if (paths[i].includes("%") && paths[i].includes("^")) {
								result = paths[i];
							} else if (paths[i].includes("%") && paths[i].includes("&")) {
								result = paths[i];
							} else if (paths[i].includes("^") && paths[i].includes("&")) {
								result = paths[i];
							}
						}
					}
				}

				if (spaces(paths[i]) == false) {
					paths[i] = "a[M]";
				}

				tiles_start = paths[i].indexOf("[");
				tiles_start = tiles_start + 1;
				tiles_length = paths[i].substr(tiles_start, paths[i].length);
				tiles_length = tiles_length.substr(0, tiles_length.length - 1);

				if (tiles(tiles_length) == true) {
					result = paths[i];
				}

				paths1 = paths[i].substr(0, tiles_start - 1);

				if (paths1.substr(paths1.length - 1, paths1.length) === ")") {
					paths1 = paths1.substr(0, paths1.length - 1);
				}

				if (paths1.indexOf("(") == 0) {
					paths1 = paths1.substr(1, paths1.length);
				}

				paths_no_arp = paths1.replace(/\x21|\x24|\x25|\x26|\x2e|\x40|\x5e|\x7e/g, ',');
				paths_no_arp = paths_no_arp.split(",");

				for (j = 0; j < paths_no_arp.length; j++) {
					if (paths_no_arp[j] === "A-3") {
						result_tile = "";
					} else if (paths_no_arp[j] === "#A-3") {
						result_tile = "";
					} else if (paths_no_arp[j] === "B-3") {
						result_tile = "";
					} else if (paths_no_arp[j] === "C-2") {
						result_tile = "";
					} else if (paths_no_arp[j] === "#C-2") {
						result_tile = "";
					} else if (paths_no_arp[j] === "D-2") {
						result_tile = "";
					} else if (paths_no_arp[j] === "#D-2") {
						result_tile = "";
					} else if (paths_no_arp[j] === "E-2") {
						result_tile = "";
					} else if (paths_no_arp[j] === "F-2") {
						result_tile = "";
					} else if (paths_no_arp[j] === "#F-2") {
						result_tile = "";
					} else if (paths_no_arp[j] === "G-2") {
						result_tile = "";
					} else if (paths_no_arp[j] === "#G-2") {
						result_tile = "";
					} else if (paths_no_arp[j] === "A-2") {
						result_tile = "";
					} else if (paths_no_arp[j] === "#A-2") {
						result_tile = "";
					} else if (paths_no_arp[j] === "B-2") {
						result_tile = "";
					} else if (paths_no_arp[j] === "C-1") {
						result_tile = "";
					} else if (paths_no_arp[j] === "#C-1") {
						result_tile = "";
					} else if (paths_no_arp[j] === "D-1") {
						result_tile = "";
					} else if (paths_no_arp[j] === "#D-1") {
						result_tile = "";
					} else if (paths_no_arp[j] === "E-1") {
						result_tile = "";
					} else if (paths_no_arp[j] === "F-1") {
						result_tile = "";
					} else if (paths_no_arp[j] === "#F-1") {
						result_tile = "";
					} else if (paths_no_arp[j] === "G-1") {
						result_tile = "";
					} else if (paths_no_arp[j] === "#G-1") {
						result_tile = "";
					} else if (paths_no_arp[j] === "A-1") {
						result_tile = "";
					} else if (paths_no_arp[j] === "#A-1") {
						result_tile = "";
					} else if (paths_no_arp[j] === "B-1") {
						result_tile = "";
					} else if (paths_no_arp[j] === "c") {
						result_tile = "";
					} else if (paths_no_arp[j] === "#c") {
						result_tile = "";
					} else if (paths_no_arp[j] === "d") {
						result_tile = "";
					} else if (paths_no_arp[j] === "#d") {
						result_tile = "";
					} else if (paths_no_arp[j] === "e") {
						result_tile = "";
					} else if (paths_no_arp[j] === "f") {
						result_tile = "";
					} else if (paths_no_arp[j] === "#f") {
						result_tile = "";
					} else if (paths_no_arp[j] === "g") {
						result_tile = "";
					} else if (paths_no_arp[j] === "#g") {
						result_tile = "";
					} else if (paths_no_arp[j] === "a") {
						result_tile = "";
					} else if (paths_no_arp[j] === "#a") {
						result_tile = "";
					} else if (paths_no_arp[j] === "b") {
						result_tile = "";
					} else if (paths_no_arp[j] === "c1") {
						result_tile = "";
					} else if (paths_no_arp[j] === "#c1") {
						result_tile = "";
					} else if (paths_no_arp[j] === "d1") {
						result_tile = "";
					} else if (paths_no_arp[j] === "#d1") {
						result_tile = "";
					} else if (paths_no_arp[j] === "e1") {
						result_tile = "";
					} else if (paths_no_arp[j] === "f1") {
						result_tile = "";
					} else if (paths_no_arp[j] === "#f1") {
						result_tile = "";
					} else if (paths_no_arp[j] === "g1") {
						result_tile = "";
					} else if (paths_no_arp[j] === "#g1") {
						result_tile = "";
					} else if (paths_no_arp[j] === "a1") {
						result_tile = "";
					} else if (paths_no_arp[j] === "#a1") {
						result_tile = "";
					} else if (paths_no_arp[j] === "b1") {
						result_tile = "";
					} else if (paths_no_arp[j] === "c2") {
						result_tile = "";
					} else if (paths_no_arp[j] === "#c2") {
						result_tile = "";
					} else if (paths_no_arp[j] === "d2") {
						result_tile = "";
					} else if (paths_no_arp[j] === "#d2") {
						result_tile = "";
					} else if (paths_no_arp[j] === "e2") {
						result_tile = "";
					} else if (paths_no_arp[j] === "f2") {
						result_tile = "";
					} else if (paths_no_arp[j] === "#f2") {
						result_tile = "";
					} else if (paths_no_arp[j] === "g2") {
						result_tile = "";
					} else if (paths_no_arp[j] === "#g2") {
						result_tile = "";
					} else if (paths_no_arp[j] === "a2") {
						result_tile = "";
					} else if (paths_no_arp[j] === "#a2") {
						result_tile = "";
					} else if (paths_no_arp[j] === "b2") {
						result_tile = "";
					} else if (paths_no_arp[j] === "c3") {
						result_tile = "";
					} else if (paths_no_arp[j] === "#c3") {
						result_tile = "";
					} else if (paths_no_arp[j] === "d3") {
						result_tile = "";
					} else if (paths_no_arp[j] === "#d3") {
						result_tile = "";
					} else if (paths_no_arp[j] === "e3") {
						result_tile = "";
					} else if (paths_no_arp[j] === "f3") {
						result_tile = "";
					} else if (paths_no_arp[j] === "#f3") {
						result_tile = "";
					} else if (paths_no_arp[j] === "g3") {
						result_tile = "";
					} else if (paths_no_arp[j] === "#g3") {
						result_tile = "";
					} else if (paths_no_arp[j] === "a3") {
						result_tile = "";
					} else if (paths_no_arp[j] === "#a3") {
						result_tile = "";
					} else if (paths_no_arp[j] === "b3") {
						result_tile = "";
					} else if (paths_no_arp[j] === "c4") {
						result_tile = "";
					} else if (paths_no_arp[j] === "#c4") {
						result_tile = "";
					} else if (paths_no_arp[j] === "d4") {
						result_tile = "";
					} else if (paths_no_arp[j] === "#d4") {
						result_tile = "";
					} else if (paths_no_arp[j] === "e4") {
						result_tile = "";
					} else if (paths_no_arp[j] === "f4") {
						result_tile = "";
					} else if (paths_no_arp[j] === "#f4") {
						result_tile = "";
					} else if (paths_no_arp[j] === "g4") {
						result_tile = "";
					} else if (paths_no_arp[j] === "#g4") {
						result_tile = "";
					} else if (paths_no_arp[j] === "a4") {
						result_tile = "";
					} else if (paths_no_arp[j] === "#a4") {
						result_tile = "";
					} else if (paths_no_arp[j] === "b4") {
						result_tile = "";
					} else if (paths_no_arp[j] === "c5") {
						result_tile = "";
					} else if (paths_no_arp[j] === "mute") {
						result_tile = "";
					} else if (paths_no_arp[j] === "empty") {
						result_tile = "";
					} else if (spaces(paths_no_arp[j]) == false) {
						result_tile = "";
					} else {
						result = paths[i];
					}
				}
			}
		}
	}

	b1 = path1.match(/\x3c/g);

	if (b1 == null) {
		b1 = "";
	}

	b2 = path1.match(/\x3e/g);

	if (b1.length > 0 && b2 == null) {
		path1 = "5<a[M]>,5<a[M]>";
		result = `<${result}`;
	}

	special_tiles = [];
	path1 = path1.split(",");

	for (i = 0; i < path1.length; i++) {
		j = i + 1;

		if (path1[i].includes("<") && !path1[i].includes(">")) {
			special_tiles.push(path1[i]);
			path1[i] = path1[i].replace(path1[i], "");

			if (!path1[j].includes(">")) {
				path1[j] = `${path1[j]}<`;
			}
		} else if (path1[i].includes(">") && !path1[i].includes("<")) {
			special_tiles.push(path1[i]);
			path1[i] = path1[i].replace(path1[i], "");
		} else if (path1[i].includes(">") && path1[i].includes("<")) {
			special_tiles.push(path1[i]);
			path1[i] = path1[i].replace(path1[i], "");
		}
	}

	for (i = 0; i < special_tiles.length; i++) {
		if (special_tiles[i].lastIndexOf("<") == special_tiles[i].length - 1) {
			special_tiles[i] = special_tiles[i].substr(0, special_tiles[i].length - 1);
		}
	}

	if (special_tiles == "") {
		special_tiles = ["5<a[M]>", "5<a[M]>"];
	}

	special_tiles1 = special_tiles.pop();
	special_tiles1 = special_tiles1.substr(0, special_tiles1.length - 1);
	special_tiles.push(special_tiles1);
	special_tiles1 = special_tiles.shift();

	if (special_tiles1.indexOf("2<") == 0 || special_tiles1.indexOf("3<") == 0 || special_tiles1.indexOf("5<") == 0 || special_tiles1.indexOf("6<") == 0 || special_tiles1.indexOf("7<") == 0 || special_tiles1.indexOf("8<") == 0 || special_tiles1.indexOf("9<") == 0) {
		special_tiles1 = special_tiles1.substr(2, special_tiles1.length);
	} else if (special_tiles1.indexOf("10<") == 0) {
		special_tiles1 = special_tiles1.substr(3, special_tiles1.length);
	}

	special_tiles.unshift(special_tiles1);
	special_tiles = special_tiles.join();
	special_tiles = special_tiles.replace(/\x3e\x2c2\x3c|\x3e\x2c3\x3c|\x3e\x2c5\x3c|\x3e\x2c6\x3c|\x3e\x2c7\x3c|\x3e\x2c8\x3c|\x3e\x2c9\x3c|\x3e\x2c10\x3c/g, ",");
	special_tiles = special_tiles.split(",");
	path1 = path1.join();
	path1_return = path1.split(",");
	path1 = path1.replace(/1|2|3|4|5|6|7|8|9|0|\x21|\x23|\x24|\x25|\x26|\x28|\x29|\x40|\x2d|\x2e|\x3c|\x3e|\x5b|\x5d|\x5e|\x7b|\x7d|\x7e|mute|empty|A|B|C|D|E|F|G|Z|a|b|c|d|e|f|g|h|i|j|k|l|m|n|o|p|q|r|s|t|u|v|w|x|y|z/g, "");
	path1 = path1.replace(/Q/g, "RR");
	path1 = path1.replace(/R/g, "SS");
	path1 = path1.replace(/S/g, "TT");
	path1 = path1.replace(/T/g, "UU");
	path1 = path1.replace(/U/g, "VV");
	path1 = path1.replace(/V/g, "WW");
	path1 = path1.replace(/W/g, "XX");
	path1 = path1.replace(/X/g, "YY");
	path1 = path1.replace(/Y/g, "P");
	path1 = path1.replace(/H/g, "II");
	path1 = path1.replace(/I/g, "JJ");
	path1 = path1.replace(/J/g, "KK");
	path1 = path1.replace(/K/g, "LL");
	path1 = path1.replace(/L/g, "MM");
	path1 = path1.replace(/M/g, "NN");
	path1 = path1.replace(/N/g, "OO");
	path1 = path1.replace(/O/g, "PP");
	path1 = path1.split(",");
	path1.pop();
	result1 = "";

	if (multiplying != 0) {
		const path1_new = path1.map(_ref10 => {
			const length = _ref10.length;
			const x = length;

			if (x == 0) {
				return 1;
			}

			const length_of_tile = x * multiplying;

			if (length_of_tile < 1) {
				return -1;
			}

			const n = parseInt(length_of_tile);
			return n;
		});
		path1 = path1_new;
		
		if (created == 1) {
			for (i = 0; i <= path1.length; i++) {
				if (path1[i] == -1) {
					result1 = path1_return[i];
				}
			}
		}
	}

	for (i = 0; i < special_tiles.length; i++) {
		if (special_tiles[i].includes("<") || special_tiles[i].includes(">")) {
			result = special_tiles[i];
		}
	}

	result = result.replace(/\</g, "<");
	result = result.replace(/\>/g, ">");

	if (result1.length > 0) {
		document.getElementById("code_result").innerHTML = `<strong style="color: red">编码错误：长度小于1(<strong style="color: gold">${result1}</strong>)</strong>`;
		bbb = 0;
	} else {
		if (result.length > 0) {
			document.getElementById("code_result").innerHTML = `<strong style="color: red">编码错误：<strong style="color: gold">${result}</strong></strong>`;
			bbb = 0;
		} else if (result_tile.length > 0) {
			document.getElementById("code_result").innerHTML = `<strong style="color: red">编码错误：<strong style="color: gold">${result_tile}</strong></strong>`;
			bbb = 0;
		} else if (result_tile1.length > 0) {
			document.getElementById("code_result").innerHTML = `<strong style="color: red">编码错误：<strong style="color: gold">${result_tile1}</strong></strong>`;
			bbb = 0;
		} else {
			// document.getElementById("code_result").innerHTML = "<strong style=\"color: lime\">NO ERRORS!</strong>";
			document.getElementById('code_result').innerHTML = '';
			bbb = 1;
		}
	}
}