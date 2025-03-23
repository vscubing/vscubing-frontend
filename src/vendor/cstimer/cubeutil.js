/* eslint-disable */
// prettier-ignore

"use strict";

import './mathlib'

window.cubeutil = (function() {

	function toEqus(facelet) {
		var col2equ = {};
		for (var i = 0; i < facelet.length; i++) {
			var col = facelet[i];
			if (col == '-') {
				continue;
			}
			col2equ[col] = col2equ[col] || [];
			col2equ[col].push(i);
		}
		var equs = [];
		for (var col in col2equ) {
			if (col2equ[col].length > 1) {
				equs.push(col2equ[col]);
			}
		}
		return equs;
	}

	var crossMask = toEqus("----U--------R--R-----F--F--D-DDD-D-----L--L-----B--B-");
	var f2l1Mask = toEqus("----U-------RR-RR-----FF-FF-DDDDD-D-----L--L-----B--B-");
	var f2l2Mask = toEqus("----U--------R--R----FF-FF-DD-DDD-D-----LL-LL----B--B-");
	var f2l3Mask = toEqus("----U--------RR-RR----F--F--D-DDD-DD----L--L----BB-BB-");
	var f2l4Mask = toEqus("----U--------R--R-----F--F--D-DDDDD----LL-LL-----BB-BB");
	var f2lMask = toEqus("----U-------RRRRRR---FFFFFFDDDDDDDDD---LLLLLL---BBBBBB");
	var ollMask = toEqus("UUUUUUUUU---RRRRRR---FFFFFFDDDDDDDDD---LLLLLL---BBBBBB");
	var eollMask = toEqus("-U-UUU-U----RRRRRR---FFFFFFDDDDDDDDD---LLLLLL---BBBBBB");
	var cpllMask = toEqus("UUUUUUUUUr-rRRRRRRf-fFFFFFFDDDDDDDDDl-lLLLLLLb-bBBBBBB");
	var roux1Mask = toEqus("---------------------F--F--D--D--D-----LLLLLL-----B--B");
	var roux2Mask = toEqus("------------RRRRRR---F-FF-FD-DD-DD-D---LLLLLL---B-BB-B");
	var roux3Mask = toEqus("U-U---U-Ur-rRRRRRRf-fF-FF-FD-DD-DD-Dl-lLLLLLLb-bB-BB-B");
	var LLPattern = "012345678cdeRRRRRR9abFFFFFFDDDDDDDDDijkLLLLLLfghBBBBBB";
	var c2LLPattern = "0-1---2-36-7---R-R4-5---F-FD-D---D-Da-b---L-L8-9---B-B";
	var c2LLMask = toEqus("---------------R-R------F-FD-D---D-D------L-L------B-B");
	var solvedMask = toEqus(mathlib.SOLVED_FACELET);

	var cubeRots = (function genRots() {

		function faceletRot(facelet, rot) {
			var ret = [];
			for (var i = 0; i < 54; i++) {
				ret[rot[i]] = facelet[i];
			}
			return ret;
		}

		var cubeRotY = [2, 5, 8, 1, 4, 7, 0, 3, 6, 18, 19, 20, 21, 22, 23, 24, 25, 26, 36, 37, 38, 39, 40, 41, 42, 43, 44, 33, 30, 27, 34, 31, 28, 35, 32, 29, 45, 46, 47, 48, 49, 50, 51, 52, 53, 9, 10, 11, 12, 13, 14, 15, 16, 17];
		var cubeRotX = [53, 52, 51, 50, 49, 48, 47, 46, 45, 11, 14, 17, 10, 13, 16, 9, 12, 15, 0, 1, 2, 3, 4, 5, 6, 7, 8, 18, 19, 20, 21, 22, 23, 24, 25, 26, 42, 39, 36, 43, 40, 37, 44, 41, 38, 35, 34, 33, 32, 31, 30, 29, 28, 27];
		var cubeRotZ = [11, 14, 17, 10, 13, 16, 9, 12, 15, 29, 32, 35, 28, 31, 34, 27, 30, 33, 20, 23, 26, 19, 22, 25, 18, 21, 24, 38, 41, 44, 37, 40, 43, 36, 39, 42, 2, 5, 8, 1, 4, 7, 0, 3, 6, 51, 48, 45, 52, 49, 46, 53, 50, 47];

		var ret = [];
		var cur = [];
		for (var i = 0; i < 54; i++) {
			cur[i] = i;
		}
		for (var a = 0; a < 24; a++) {
			ret[a] = cur.slice();
			cur = faceletRot(cur, (a & 1) ? cubeRotX : cubeRotZ);
			if (a % 6 == 5) {
				cur = faceletRot(cur, cubeRotZ);
				cur = faceletRot(cur, cubeRotZ);
			}
			if (a % 12 == 11) {
				cur = faceletRot(cur, cubeRotY);
				cur = faceletRot(cur, cubeRotY);
			}
		}
		return ret;
	})();

	function solvedProgress(param, mask) {
		var cubeRot = cubeRots[param[1]];
		var facelet = param[0];
		mask = mask || solvedMask;
		for (var i = 0; i < mask.length; i++) {
			var equ = mask[i];
			var col = facelet[cubeRot[equ[0]]];
			for (var j = 1; j < equ.length; j++) {
				if (facelet[cubeRot[equ[j]]] != col) {
					return 1;
				}
			}
		}
		return 0;
	}

	//return 9: nothing, 8: cross solved, 4~7: nth f2l solved, 2~3 c/e oll solved, 1 cpll solved, 0: solved
	function getCF4O2P2Progress(param) {
		if (solvedProgress(param, crossMask)) {
			return 9;
		} else if (solvedProgress(param, f2lMask)) {
			return 4 +
				solvedProgress(param, f2l1Mask) +
				solvedProgress(param, f2l2Mask) +
				solvedProgress(param, f2l3Mask) +
				solvedProgress(param, f2l4Mask);
		} else if (solvedProgress(param, eollMask)) {
			return 4;
		} else if (solvedProgress(param, ollMask)) {
			return 3;
		} else if (solvedProgress(param, cpllMask)) {
			return 2;
		} else if (solvedProgress(param)) {
			return 1;
		}
		return 0;
	}

	//return 7: nothing, 6: cross solved, 2~5: nth f2l solved, 1 oll solved, 0: solved
	function getCF4OPProgress(param) {
		if (solvedProgress(param, crossMask)) {
			return 7;
		} else if (solvedProgress(param, f2lMask)) {
			return 2 +
				solvedProgress(param, f2l1Mask) +
				solvedProgress(param, f2l2Mask) +
				solvedProgress(param, f2l3Mask) +
				solvedProgress(param, f2l4Mask);
		} else if (solvedProgress(param, ollMask)) {
			return 2;
		} else if (solvedProgress(param)) {
			return 1;
		}
		return 0;
	}

	//return 4: nothing, 3: cross solved, 2: f2l solved, 1 oll solved, 0: solved
	function getCFOPProgress(param) {
		if (solvedProgress(param, crossMask)) {
			return 4;
		} else if (solvedProgress(param, f2lMask)) {
			return 3;
		} else if (solvedProgress(param, ollMask)) {
			return 2;
		} else if (solvedProgress(param)) {
			return 1;
		}
		return 0;
	}

	//return 2: nothing, 1: f2l solved, 0: solved
	function getFPProgress(param) {
		if (solvedProgress(param, f2lMask)) {
			return 2;
		} else if (solvedProgress(param)) {
			return 1;
		}
		return 0;
	}

	//return 4: nothing, 3: block1, 2: block2, 1: cll, 0: solved
	function getRouxProgress(param) {
		if (solvedProgress(param, roux1Mask)) {
			return 4;
		} else if (solvedProgress(param, roux2Mask)) {
			return 3;
		} else if (solvedProgress(param, roux3Mask)) {
			return 2;
		} else if (solvedProgress(param)) {
			return 1;
		}
		return 0;
	}

	var stepParams = {
		'cross': [6, crossMask],
		'f2l':   [6, f2lMask],
		'oll':   [6, ollMask],
		'eoll':  [6, eollMask],
		'cpll':  [6, cpllMask],
		'fb':    [24, roux1Mask],
		'sb':    [24, roux2Mask],
		'cmll':  [24, roux3Mask]
	};

	//return 0: solved, 1 not solved
	function calcStepProgress(step, param) {
		if (step in stepParams) {
			return solvedProgress(param, stepParams[step][1]);
		}
		return solvedProgress(param);
	}

	function getStepProgress(step, facelet, n_axis) {
		if (!n_axis) {
			n_axis = (step in stepParams) ? stepParams[step][0] : 1;
		}
		return getProgressNAxis(facelet, calcStepProgress.bind(null, step), n_axis);
	}

	//6 axes: D -x-> B -z-> R -x-> U -z-> F -x-> L -z-> D
	function getProgressNAxis(facelet, process, n_axis) {
		var minRet = 99;
		for (var a = 0; a < n_axis; a++) {
			minRet = Math.min(minRet, process([facelet, a]));
		}
		return minRet;
	}

	var centerRot = [
		[0, 2, 4, 3, 5, 1], // y'
		[5, 1, 0, 2, 4, 3], // x'
		[4, 0, 2, 1, 3, 5] // z
	];

	function moveSeq2str(moveSeq) {
		return $.map(moveSeq, function(val) {
			return val[0].trim() + '@' + val[1];
		}).join(' ');
	}

	//rawMoveSeqs: [moveseq, moveseq, ..., moveseq]
	//moveseq: [[move, timestamp], [move, timestamp], ..., [move, timestamp]]
	//move: string [URFDLB][ 2']
	//return: [[movestr, length], [movestr, length], ..., [movestr, length]]
	function getPrettyMoves(rawMoveSeqs) {
		// console.log(rawAlgs);
		var center = [0, 1, 2, 3, 4, 5];

		return $.map(rawMoveSeqs, function(moveSeq, seqIdx) {
			var ret = [];

			function pushSol(axis, pow) {
				if (ret.length == 0 || ~~(ret[ret.length - 1] / 3) != axis) {
					ret.push(axis * 3 + pow);
					return;
				}
				pow = (pow + ret[ret.length - 1] % 3 + 1) % 4;
				if (pow == 3) {
					ret.pop();
				} else {
					ret[ret.length - 1] = axis * 3 + pow;
				}
			}

			for (var i = 0; i < moveSeq.length; i++) {
				var axis = center.indexOf("URFDLB".indexOf(moveSeq[i][0][0]));
				var pow = " 2'".indexOf(moveSeq[i][0][1]) % 3;
				if (false || i == moveSeq.length - 1 || moveSeq[i + 1][1] - moveSeq[i][1] > 100) {
					pushSol(axis, pow);
					continue;
				}
				var axis2 = center.indexOf("URFDLB".indexOf(moveSeq[i + 1][0][0]));
				var pow2 = " 2'".indexOf(moveSeq[i + 1][0][1]) % 3;
				if (axis != axis2 && axis % 3 == axis2 % 3 && pow + pow2 == 2) {
					var axisM = axis % 3;
					var powM = (pow - 1) * [1, 1, -1, -1, -1, 1][axis] + 1;
					pushSol(axisM + 6, powM)
					for (var p = 0; p < powM + 1; p++) {
						var center_ = [];
						for (var c = 0; c < 6; c++) {
							center_[c] = center[centerRot[axisM][c]];
						}
						center = center_;
					}
					i++;
					continue;
				}
				pushSol(axis, pow);
			}
			return [
				[$.map(ret, function(val) {
					return "URFDLBEMS".charAt(~~(val / 3)) + " 2'".charAt(val % 3);
				}).join(""), ret.length]
			];
		});
	}

	var identPLL = (function() {
		var pllPattern = [];
		return function(facelet) {
			if (pllPattern.length == 0) {
				for (var i = 0; i < 22; i++) {
					var param = i == 21 ? 'UUUUUUUUUFFFRRRBBBLLL' : scramble_333.getPLLImage(i)[0];
					pllPattern.push(toEqus(LLPattern.replace(/[0-9a-z]/g, function(v) {
						return param[parseInt(v, 36)].toLowerCase();
					})));
				}
			}
			return searchCaseByPattern(facelet, ollMask, pllPattern);
		}
	})();

	var identOLL = (function() {
		var ollPattern = [];
		return function(facelet) {
			if (ollPattern.length == 0) {
				for (var i = 0; i < 58; i++) {
					var param = scramble_333.getOLLImage(i)[0].replace(/G/g, '-');
					ollPattern.push(toEqus(LLPattern.replace(/[0-9a-z]/g, function(v) {
						return param[parseInt(v, 36)].toLowerCase();
					})));
				}
			}
			return searchCaseByPattern(facelet, f2lMask, ollPattern);
		}
	})();

	var identC2CLL = (function() {
		var cllPattern = [];
		return function(facelet) {
			if (cllPattern.length == 0) {
				for (var i = 0; i < 40; i++) {
					var param = scramble_222.getEGLLImage(i)[0].replace(/G/g, '-');
					cllPattern.push(toEqus(c2LLPattern.replace(/[0-9a-z]/g, function(v) {
						return param[parseInt(v, 36)].toLowerCase();
					})));
				}
			}
			return searchCaseByPattern(facelet, c2LLMask, cllPattern);
		}
	})();

	function searchCaseByPattern(facelet, baseMask, patterns) {
		var chkList = [];
		for (var a = 0; a < 24; a++) {
			if (solvedProgress([facelet, a], baseMask) == 0) {
				chkList.push(a);
			}
		}
		for (var i = 0; i < patterns.length; i++) {
			for (var j = 0; j < chkList.length; j++) {
				if (solvedProgress([facelet, chkList[j]], patterns[i]) == 0) {
					return i;
				}
			}
		}
		return -1;
	}

	function identStep(step, facelet) {
		switch (step) {
			case 'PLL':
				return identPLL(facelet);
			case 'OLL':
				return identOLL(facelet);
			case 'C2CLL':
				return identC2CLL(facelet);
		}
	}

	function getIdentData(method) {
		var identData = {
			//name: [ident, genImg, startIdx, endIdx, stageIdx]
			'PLL': [identPLL, scramble_333.getPLLImage, 0, 21, 0],
			'OLL': [identOLL, scramble_333.getOLLImage, 1, 58, 1],
			'CLL': [identC2CLL, scramble_222.getEGLLImage, 0, 40, 1]
		};
		return method ? identData[method] : identData;
	}

	function getScrambledState(scramble, reqFace) {
		var scrType = scramble[0];
		var scrSeq = scramble[1];
		if (!tools.isPuzzle('333', scramble)) {
			return;
		}
		var scr = kernel.parseScramble(scrSeq, "URFDLB");
		var c = new mathlib.CubieCube();
		var d = new mathlib.CubieCube();
		c.ori = 0;
		for (var i = 0; i < scr.length; i++) {
			var axis = scr[i][0];
			var pow = scr[i][2];
			var m = axis * 3 + pow - 1;
			if (m < 0 || m >= 18) {
				continue;
			}
			if (scr[i][1] == 2) { //Xw
				var rot = [3, 15, 17, 1, 11, 23][axis];
				for (var j = 0; j < pow; j++) {
					c.ori = mathlib.CubieCube.rotMult[rot][c.ori];
				}
				m = mathlib.CubieCube.rotMulM[c.ori][(axis + 3) % 6 * 3 + pow - 1];
			}
			mathlib.CubieCube.EdgeMult(c, mathlib.CubieCube.moveCube[m], d);
			mathlib.CubieCube.CornMult(c, mathlib.CubieCube.moveCube[m], d);
			c.init(d.ca, d.ea);
		}
		return reqFace ? c.toFaceCube() : c;
	}

	function getProgress(facelet, method) {
		switch (method) {
			case 'cfop':
				return getProgressNAxis(facelet, getCFOPProgress, 6);
			case 'fp':
				return getProgressNAxis(facelet, getFPProgress, 6);
			case 'cf4op':
				return getProgressNAxis(facelet, getCF4OPProgress, 6);
			case 'roux':
				return getProgressNAxis(facelet, getRouxProgress, 24);
			case 'cf4o2p2':
				return getProgressNAxis(facelet, getCF4O2P2Progress, 6);
			case 'n':
				return getProgressNAxis(facelet, solvedProgress, 1);
		}
	}

	function getStepNames(method) {
		switch (method) {
			case 'cfop':
				return ['pll', 'oll', 'f2l', 'cross'];
			case 'fp':
				return ['op', 'cf'];
			case 'cf4op':
				return ['pll', 'oll', 'f2l-4', 'f2l-3', 'f2l-2', 'f2l-1', 'cross'];
			case 'roux':
				return ['l6e', 'cmll', 'sb', 'fb'];
			case 'cf4o2p2':
				return ['pll', 'cpll', 'oll', 'eoll', 'f2l-4', 'f2l-3', 'f2l-2', 'f2l-1', 'cross'];
			case 'n':
				return ['solve'];
		}
	}

	function getStepCount(method) {
		var stepNames = getStepNames(method);
		return stepNames ? stepNames.length : 0;
	}

	function getPrettyReconstruction(rawMoves, method) {
		var prettySolve = "";
		var prettyMoves = getPrettyMoves(rawMoves);
		var stepNames = getStepNames(method).reverse();
		var totalMoves = 0;
		for (var i = 0; i < prettyMoves.length; i++) {
			totalMoves += prettyMoves[i][1];
			prettySolve += prettyMoves[i][0].replace(/ /g, '') + (stepNames[i] ? " // " + stepNames[i] + " " + prettyMoves[i][1] + " move(s)" : "") + "\n";
		}
		return {
			prettySolve: prettySolve,
			totalMoves: totalMoves
		};
	}

	return {
		getProgress: getProgress,
		getStepNames: getStepNames,
		getStepCount: getStepCount,
		getStepProgress: getStepProgress,
		getPrettyMoves: getPrettyMoves,
		getPrettyReconstruction: getPrettyReconstruction,
		moveSeq2str: moveSeq2str,
		getScrambledState: getScrambledState,
		identStep: identStep,
		getIdentData: getIdentData,
	}

})();
