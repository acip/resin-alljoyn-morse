var resin = resin || {};

//Morse converter (string to array)
resin.Morse  = function (emitter) {
	var code = {
					"a": "._", "b": "_...", "c": "_._.", "d": "_..",
					"e": ".", "f": ".._.", "g": "__.", "h": "....",
					"i": "..", "j": ".___", "k": "_._", "l": "._..",
					"m": "__", "n": "_.", "o": "___", "p": ".__.",
					"q": "__._", "r": "._.", "s": "...", "t": "_",
					"u": ".._", "v": "..._", "w": ".__", "x": "_.._",
					"y": "_.__", "z": "__..", " ": " ",
					"1": ".____", "2": "..___", "3": "...__", "4": "...._", "5": ".....",
					"6": "_....", "7": "__...", "8": "___..", "9": "____.", "0": "_____",
					/*
					* Note: Some operators prefer "!" as "___." and others as "_._.__"
					* ARRL message format has most punctuation spelled out, as many symbols'
					* encodings conflict with procedural signals (e.g. "=" and "BT").
					*/
					".": "._._._", ",": "__..__", "?": "..__..", "'": ".____.",
					"/": "_.._.", "(": "_.__.", ")": "_.__._", "&": "._...",
					":": "___...", ";": "_._._.", "=": "_..._", "+": "._._.",
					"-": "_...._", "_": "..__._", "\"": "._.._.", "$": "..._.._",
					"!": "_._.__", "@": ".__._."
	};

	//transform plain text to array of morse codes
	//returns an array of arrays. Each array represents a word
	function parse(str) {
		var morse_code = [];
		var word = [];
		var symbol;

		str = str.toLowerCase()

		for (var i = 0 ; i < str.length; i++) {
			if (str[i] == " ") {
				if ( word ) {
					morse_code.push(word);
				}
				word = [];
			} else {
				symbol = code[str[i]];
				if ( symbol ) {
					word.push(symbol);
				}
			}
		};

		//last word
		if ( word ) {
			morse_code.push(word);
		}

		return morse_code;
	}

	function emit(str) {
		var morse_code = parse(str);
		emitter.emit(morse_code);
	}

	this.emit = emit;
};

//outputs morese code array
resin.TextEmitter  = function () {
	//interface
	this.emit = emit;

	function emit(morse_code) {
		var out = "";
		for (var i = 0; i < morse_code.length; i++) {
			out += morse_code[i].join(" ") + "    ";
		}

		print(out.trim());
	}
};


var emitter = new resin.TextEmitter();
var morse = new resin.Morse(emitter);

var AJ = require('AllJoyn');

var cp = AJ.controlPanel();

InitControlPanel(cp);

AJ.onAttach = function() { cp.load(); }

function InitControlPanel(cp) {
    var c1 = cp.containerWidget(cp.VERTICAL);
 
    var edit_text = c1.propertyWidget(cp.EDIT_TEXT, "", "Text2Morse");
    edit_text.onValueChanged = function (val) {
        print("Text2Morse: " + val);
        morse.emit(val);
    };

    c1.color={red:255,green:0,blue:128};
}