	// Keyword List Generator
	// Author: HoldOffHunger
	// License: BSD 3-Clause

$(document).ready(function(e){

					// Globals
					// ---------------------------------------------------------
					// ---------------------------------------------------------
					// ---------------------------------------------------------
			
		/* getTimeOutDelay()
		
			Get the delay of the timeout for typing.
		
		*/
			
	function getTimeOutDelay() {
		return 1000;	// 1 seconds
	}
	
		/* getMaxOnomatopoeiaLength()
		
			Get the max length of an onomatopoeia to exclude from the keywords list.
		
		*/
	
	function getMaxOnomatopoeiaLength() {
		return 20;
	}
	
		/* processingText()
			
			Get the text to display when the keyword list generator is thinking.
			
		*/
	
	function processingText() {
		return 'Processing';
	}
	
		/* waitingForUserText()
		
			Get the text to display when the keyword list generator is waiting.
		
		*/
	
	function waitingForUserText() {
		return 'Waiting for User';
	}
	
		/* getKeywordCountSeparator()
		
			Get the text that separates a keyword from its count.
		
		*/
		
	function getKeywordCountSeparator() {
		return ' -- ';
	}
	
		/* getKeywordSeparator()
		
			Get the text that separates a keyword from another keyword.
		
		*/
		
	function getKeywordSeparator() {
		return "\n";
	}
	
		/* getKeywordSectionSeparator()
		
			Get the text that separates a keyword section from other sections.
		
		*/
		
	function getKeywordSectionSeparator() {
		return "\n\n";
	}

					// Event and Element Handlers
					// ---------------------------------------------------------
					// ---------------------------------------------------------
					// ---------------------------------------------------------
		
		/* $('.input-area').keyup(function(e) {...})
		
			Run findKeywords() only after so much time has delayed from keyup movements.
		
		*/
		
	var timeout = false;
	
	$('.input-area').keyup(function(e) {
		$('#status-text').text(processingText());
		if(timeout) {
			clearTimeout(timeout);
		}
		timeout = setTimeout(function() {
			findKeywords();
		}, getTimeOutDelay());
		return true;
	});
	
		/* $('.input-area').click(function(e) {...})
		
			Clear the input area of its default instruction set when input area is clicked.
		
		*/
	
	$('.input-area').click(function(e) {
		return initiateApp();
	});
	
		/* $('.find-keywords-button').click(function(e) {...})
		
			User clicked the "Find Keywords" button.
			
			Regenerate the keyword list.
		
		*/
	
	$('.find-keywords-button').click(function(e) {
		return findKeywords();
	});
	
		/* $('.strip-html').click(function(e) {...})
		
			User changed the option of stripping HTML from the input.
			
			Regenerate the keyword list.
		
		*/
	
	$('.strip-html').click(function(e) {
		return findKeywords();
	});
	
		/* $('.ignore-common-words').click(function(e) {...})
		
			User changed the option of ignoring common words in the keyword list.
			
			Regenerate the keyword list.
		
		*/
	
	$('.ignore-common-words').click(function(e) {
		return findKeywords();
	});
	
		/* $('.include-phrases').click(function(e) {...})
		
			User changed the option of including phrases in the keyword list.
			
			Regenerate the keyword list.
		
		*/
	
	$('.include-phrases').click(function(e) {
		return findKeywords();
	});
	
		/* $('.show-counts').click(function(e) {...})
		
			User changed the option of showing the keyword counts
			
			Regenerate the keyword list.
		
		*/
	
	$('.show-counts').click(function(e) {
		return findKeywords();
	});
	
		/* $('#sort-order').change(function(e) {...})
		
			User changed the sort order of the keyword lists.
			
			Regenerate the keyword list.
		
		*/
	
	$('#sort-order').change(function(e) {
		return findKeywords();
	});
	
		/* initiateApp()
		
			Clear the input area of its default instruction set.
			
			Bound to many event handlers.
		
		*/
		
	var started = false;
	
	function initiateApp() {
		if(!started) {
			$('.input-area').val('');
			started = true;
		}
		
		return true;
	}
	
					// Input Cleanup
					// ---------------------------------------------------------
					// ---------------------------------------------------------
					// ---------------------------------------------------------
	
		/* getInputWords()
		
			Get the input source for generating the keyword list.
		
		*/
	
	function getInputWords() {
		var inputtext = $('.input-area').val();
		var cleantext = cleanupInput({'input':inputtext});
		var inputwords = cleantext.split(' ');
		
		var realinputwords = [];
		var inputwordscount = inputwords.length;
		
		for(i = 0; i < inputwordscount; i++) {
			var inputword = $.trim(inputwords[i]);
			if(inputword.length !== 0) {
				realinputwords.push(inputword);
			}
		}
		
		return realinputwords;
	}
	
		/* cleanupInput(args)
			
			Cleanup the input from the user.
			
		*/
	
	function cleanupInput(args) {
		var input = formatInput({'input':args.input});
		
		var replacements = getCleanupReplacements();
		
		return replaceBulk({
			'string':input,
			'replacements':replacements,
		});
	}
	
		/* formatInput(args)
		
			Format the input from the user.
			
			Specifically, lowercase and, if necessary, strip HTML.
		
		*/
	
	function formatInput(args) {
		var input = args.input;
		
		input = input.toLowerCase();
		
		if($('.strip-html').is(':checked')) {
			input = $('<div/>').html(input).text();
		}
		
		return input;
	}
	
		/* getCleanupReplacements()
		
			Get text replacements for cleanup.
		
		*/
	
	function getCleanupReplacements() {
		return {
			"\t":' ',
			"\n":' ',
			"\r":' ',
			"":'',
			"":'',
			"":'',
			"":'',
			
			',':' ',
			'!':' ',
			';':' ',
			':':' ',
			'?':' ',
			'.':' ',
			'(':' ',
			')':' ',
			'[':' ',
			']':' ',
			'{':' ',
			'}':' ',
			'"':' ',
			'*':' ',
			'•':' ',
			'“':' ',
			'”':' ',
			
			'’':'\'',
			'`':'\'',
			
			' \' ':' ',
			
			'good-bye':'goodbye',
			'to-day':'today',
			'to-morrow':'tomorrow',
			'to-night':'tonight',
		};
	}
	
		/* replaceBulk(args)
		
			Replace the cleanup replacements with their correct values.
		
		*/
	
	function replaceBulk(args) {
		var solution = args.string;
		var replaceArray = args.replacements;
		var findArray = Object.keys(replaceArray);
		
		var regex = [], map = {}; 
		for(var i = 0; i < findArray.length; i++) {
			var orig = findArray[i];
			regex.push( findArray[i].replace(/([-[\]{}()*+?.\\^$|#,])/g,'\\$1') );
			map[orig] = replaceArray[orig]; 
		}
		regex = regex.join('|');
		solution = solution.replace( new RegExp( regex, 'g' ), function(matched){
			if(map[matched]) {
				return map[matched];
			}
			
			return matched;
		});
		return solution;
	}
	
		/* getSkipWords()
		
			Get the common words to ignore.
		
		*/
	
	function getSkipWords() {
		if($('.ignore-common-words').is(':checked')) {
			return getIgnoreKeywordsHash();
		}
		
		return {};
	}
	
					// Keyword-Generation Logic
					// ---------------------------------------------------------
					// ---------------------------------------------------------
					// ---------------------------------------------------------
		
		/* findKeywords()
		
			Main function for finding the keywords.
		
		*/
				
	function findKeywords() {
		var skipwords = getSkipWords();
		var inputwords = getInputWords();
		var inputwordscount = inputwords.length;

		var finaloutput = '';
		
		finaloutput = findKeywordPhrases({
			'inputwords':inputwords,
			'inputwordscount':inputwordscount,
			'skipwords':skipwords,
		});
		
		var wordcounts = getSingleKeywordCounts({
			'wordcount':inputwordscount,
			'words':inputwords,
			'skipwords':skipwords,
		});
		
		var wordcountsbynumber = sortKeywords({'wordcounts':wordcounts});
		finaloutput += displayKeywords({'keywords':wordcountsbynumber});
		
		$('.output-area').val(finaloutput);
		$('.output-area').change();
		$('#status-text').text(waitingForUserText());
		
		return true;
	}
	
		/* getIgnoreKeywordsHash()
		
			Get a hash of all keywords to ignore.
		
		*/
	
	function getIgnoreKeywordsHash() {
		var ignorekeywords = getIgnoreKeywords();
		var ignorekeywordshash = {};
		
		for(i = 0; i < ignorekeywords.length; i++) {
			ignorekeywordshash[ignorekeywords[i]] = 1;
		}
		
		return ignorekeywordshash;
	}
	
		/* findKeywordPhrases(args)
		
			Find the keyword phrases.  Return them in the order of longest phrases to shortest phrases.
			
			For example: "Industrial Workers of the World", "Revolutionary Anarchist", etc..
		
		*/
	
	function findKeywordPhrases(args) {
		var inputwords = args['inputwords'];
		var inputwordscount = args['inputwordscount'];
		var skipwords = args['skipwords'];
		
		var finaloutput = '';
		
		var separator = getKeywordSectionSeparator();
		
		if($('.include-phrases').is(':checked')) {
				// Six-Word Phrases
			var sixwordphrases = getSixWordPhraseCounts(args);
			var sixwordphrasessorted = sortKeywords({'wordcounts':sixwordphrases});
			var sixwordphrasetext = displayKeywords({'keywords':sixwordphrasessorted});
			
			if(sixwordphrasetext.length !== 0) {
				finaloutput += sixwordphrasetext + separator;
			}
			
				// Five-Word Phrases
			var fivewordphrases = getFiveWordPhraseCounts(args);
			var fivewordphrasessorted = sortKeywords({'wordcounts':fivewordphrases});
			var fivewordphrasetext = displayKeywords({'keywords':fivewordphrasessorted});
			
			if(fivewordphrasetext.length !== 0) {
				finaloutput += fivewordphrasetext + separator;
			}
			
				// Four-Word Phrases
			var fourwordphrases = getFourWordPhraseCounts(args);
			var fourwordphrasessorted = sortKeywords({'wordcounts':fourwordphrases});
			var fourwordphrasetext = displayKeywords({'keywords':fourwordphrasessorted});
			
			if(fourwordphrasetext.length !== 0) {
				finaloutput += fourwordphrasetext + separator;
			}
			
				// Three-Word Phrases
			var threewordphrases = getThreeWordPhraseCounts(args);
			var threewordphrasessorted = sortKeywords({'wordcounts':threewordphrases});
			var threewordphrasetext = displayKeywords({'keywords':threewordphrasessorted});
			
			if(threewordphrasetext.length !== 0) {
				finaloutput += threewordphrasetext + separator;
			}
			
				// Two-Word Phrases
			var twowordphrases = getTwoWordPhraseCounts(args);
			var twowordphrasessorted = sortKeywords({'wordcounts':twowordphrases});
			var twowordphrasetext = displayKeywords({'keywords':twowordphrasessorted});
			
			if(twowordphrasetext.length !== 0) {
				finaloutput += twowordphrasetext + separator;
			}
		}
		
		return finaloutput;
	}
	
		/* getTwoWordPhraseCounts(args)
		
			Get 2-word phrase keywords.
		
		*/
	
	function getTwoWordPhraseCounts(args) {
		var inputwords = args['inputwords'];
		var inputwordscount = args['inputwordscount'];
		var skipwords = args['skipwords'];
		
		var twowordphrases = {};
		
		for(i = 0; i - 1 < inputwordscount; i++) {
			var currentword = inputwords[i];
			var nextword = inputwords[i + 1];
			if(currentword && nextword) {
				if(!skipwords[currentword] && !skipwords[nextword]) {
					var phrase = currentword + ' ' + nextword;
					if(twowordphrases[phrase]) {
						twowordphrases[phrase]++;
					} else {
						twowordphrases[phrase] = 1;
					}
				}
			}
		}
		
		return twowordphrases;
	}
	
		/* getThreeWordPhraseCounts(args)
		
			Get 3-word phrase keywords.
		
		*/
	
	function getThreeWordPhraseCounts(args) {
		var inputwords = args['inputwords'];
		var inputwordscount = args['inputwordscount'];
		var skipwords = args['skipwords'];
		
		var threewordphrases = {};
		
		for(i = 0; i - 2 < inputwordscount; i++) {
			var currentword = inputwords[i];
			var nextword = inputwords[i + 1];
			var thirdword = inputwords[i + 2];
			if(currentword && nextword && thirdword) {
				if(
					(!skipwords[currentword] && !skipwords[nextword]) ||
					(!skipwords[currentword] && !skipwords[thirdword]) ||
					(!skipwords[nextword] && !skipwords[thirdword])
				) {
					var phrase = currentword + ' ' + nextword + ' ' + thirdword;
					if(threewordphrases[phrase]) {
						threewordphrases[phrase]++;
					} else {
						threewordphrases[phrase] = 1;
					}
				}
			}
		}
		
		return threewordphrases;
	}
	
		/* getFourWordPhraseCounts(args)
		
			Get 4-word phrase keywords.
		
		*/
	
	function getFourWordPhraseCounts(args) {
		var inputwords = args['inputwords'];
		var inputwordscount = args['inputwordscount'];
		var skipwords = args['skipwords'];
		
		var fourwordphrases = {};
		
		for(i = 0; i - 3 < inputwordscount; i++) {
			var currentword = inputwords[i];
			var nextword = inputwords[i + 1];
			var thirdword = inputwords[i + 2];
			var fourthword = inputwords[i + 3];
			if(currentword && nextword && thirdword && fourthword) {
				if(
					(!skipwords[currentword] && !skipwords[nextword]) ||
					(!skipwords[currentword] && !skipwords[thirdword]) ||
					(!skipwords[currentword] && !skipwords[fourthword]) ||
					(!skipwords[nextword] && !skipwords[thirdword]) ||
					(!skipwords[nextword] && !skipwords[fourthword]) ||
					(!skipwords[thirdword] && !skipwords[fourthword])
				) {
					var phrase = currentword + ' ' + nextword + ' ' + thirdword + ' ' + fourthword;
					if(fourwordphrases[phrase]) {
						fourwordphrases[phrase]++;
					} else {
						fourwordphrases[phrase] = 1;
					}
				}
			}
		}
		
		return fourwordphrases;
	}
	
		/* getFiveWordPhraseCounts(args)
		
			Get 5-word phrase keywords.
		
		*/
	
	function getFiveWordPhraseCounts(args) {
		var inputwords = args['inputwords'];
		var inputwordscount = args['inputwordscount'];
		var skipwords = args['skipwords'];
		
		var fivewordphrases = {};
		
		for(i = 0; i - 4 < inputwordscount; i++) {
			var currentword = inputwords[i];
			var nextword = inputwords[i + 1];
			var thirdword = inputwords[i + 2];
			var fourthword = inputwords[i + 3];
			var fifthword = inputwords[i + 4];
			if(currentword && nextword && thirdword && fourthword && fifthword) {
				if(
					(!skipwords[currentword] && !skipwords[nextword]) ||
					(!skipwords[currentword] && !skipwords[thirdword]) ||
					(!skipwords[currentword] && !skipwords[fourthword]) ||
					(!skipwords[currentword] && !skipwords[fifthword]) ||
					(!skipwords[nextword] && !skipwords[thirdword]) ||
					(!skipwords[nextword] && !skipwords[fourthword]) ||
					(!skipwords[nextword] && !skipwords[fifthword]) ||
					(!skipwords[thirdword] && !skipwords[fourthword]) ||
					(!skipwords[thirdword] && !skipwords[fifthword]) ||
					(!skipwords[fourthword] && !skipwords[fifthword])
				) {
					var phrase = currentword + ' ' + nextword + ' ' + thirdword + ' ' + fourthword + ' ' + fifthword;
					if(fivewordphrases[phrase]) {
						fivewordphrases[phrase]++;
					} else {
						fivewordphrases[phrase] = 1;
					}
				}
			}
		}
		
		return fivewordphrases;
	}
	
		/* getSixWordPhraseCounts(args)
		
			Get 6-word phrase keywords.
		
		*/
	
	function getSixWordPhraseCounts(args) {
		var inputwords = args['inputwords'];
		var inputwordscount = args['inputwordscount'];
		var skipwords = args['skipwords'];
		
		var sixwordphrases = {};
		
		for(i = 0; i - 5 < inputwordscount; i++) {
			var currentword = inputwords[i];
			var nextword = inputwords[i + 1];
			var thirdword = inputwords[i + 2];
			var fourthword = inputwords[i + 3];
			var fifthword = inputwords[i + 4];
			var sixthword = inputwords[i + 5];
			if(currentword && nextword && thirdword && fourthword && fifthword && sixthword) {
				if(
					(!skipwords[currentword] && !skipwords[nextword]) ||
					(!skipwords[currentword] && !skipwords[thirdword]) ||
					(!skipwords[currentword] && !skipwords[fourthword]) ||
					(!skipwords[currentword] && !skipwords[fifthword]) ||
					(!skipwords[currentword] && !skipwords[sixthword]) ||
					(!skipwords[nextword] && !skipwords[thirdword]) ||
					(!skipwords[nextword] && !skipwords[fourthword]) ||
					(!skipwords[nextword] && !skipwords[fifthword]) ||
					(!skipwords[nextword] && !skipwords[sixthword]) ||
					(!skipwords[thirdword] && !skipwords[fourthword]) ||
					(!skipwords[thirdword] && !skipwords[fifthword]) ||
					(!skipwords[thirdword] && !skipwords[sixthword]) ||
					(!skipwords[fourthword] && !skipwords[fifthword]) ||
					(!skipwords[fourthword] && !skipwords[sixthword]) ||
					(!skipwords[fifthword] && !skipwords[sixthword])
				) {
					var phrase = currentword + ' ' + nextword + ' ' + thirdword + ' ' + fourthword + ' ' + fifthword + ' ' + sixthword;
					if(sixwordphrases[phrase]) {
						sixwordphrases[phrase]++;
					} else {
						sixwordphrases[phrase] = 1;
					}
				}
			}
		}
		
		return sixwordphrases;
	}
	
		/* getSingleKeywordCounts(args)
		
			Get the counts of single keywords.
		
		*/
	
	function getSingleKeywordCounts(args) {
		words = args['words'];
		wordcount = args['wordcount'];
		skipwords = args['skipwords'];
		
		var wordcounts = {};
		
		for(i = 0; i < wordcount; i++) {
			var inputword = words[i];
			
			if(!skipwords[inputword]) {
				if(wordcounts[inputword]) {
					wordcounts[inputword]++;
				} else {
					wordcounts[inputword] = 1;
				}
			}
		}
		
		return wordcounts;
	}
	
		/* sortKeywords(args)
		
			Given keywords and their counts, sort them according to their counts.
		
		*/
	
	function sortKeywords(args) {
		var wordcounts = args['wordcounts'];
		var wordcountkeys = Object.keys(wordcounts);
		var wordcountkeyscount = wordcountkeys.length;
		
		var wordcountsbynumber = [];
		
		for(i = 0; i < wordcountkeyscount; i++) {
			wordcountkey = wordcountkeys[i];
			wordcount = wordcounts[wordcountkey];
			if(!wordcountkey.match(' ') || wordcount > 1) {
				wordcountsbynumber.push({
					'key':wordcountkey,
					'value':wordcount,
				});
			}
		}
		
		if($('#sort-order').val() === 'most-common-to-least-common') {
			wordcountsbynumber = wordcountsbynumber.sort(function(b, a) {
				return a.value -  b.value;
			});
		} else if($('#sort-order').val() === 'least-common-to-most-common') {
			wordcountsbynumber = wordcountsbynumber.sort(function(a, b) {
				return a.value - b.value;
			});
		}
		
		return wordcountsbynumber;
	}
	
		/* displayKeywords(args)
		
			Given keyworsd and their counts, format them in a way that can be displayed.
		
		*/
	
	function displayKeywords(args) {
		var keywords = args['keywords'];
		
		var output = '';
		
		var showcount = $('#show-counts').is(':checked');
		var separator = getKeywordCountSeparator();
		
		var displaycounts = [];
		
		$.each(keywords, function(key, value) {
			var displaykeyword = value['key'];
			
			if(showcount) {
				displaykeyword += separator + value['value'];
			}
			
			displaycounts.push(displaykeyword);
		});
		
		return displaycounts.join(getKeywordSeparator());
	}
	
					// Primary World-List Builder
					// ---------------------------------------------------------
					// ---------------------------------------------------------
					// ---------------------------------------------------------
	
		/* getIgnoreKeywords()

			Get keywords to ignore.
			
			If a keyword matches one of these, it will not show up in the final results.
					
		*/
	
	var ignorekeywords = [];
	
	function getIgnoreKeywords() {
		if(ignorekeywords.length) {
			return ignorekeywords;
		}
		
		ignorekeywords = ignorekeywords.concat(getIgnoreKeywords_spaces());
		
		ignorekeywords = ignorekeywords.concat(getIgnoreKeywords_multiplySymbols({'symbols':getIgnoreKeywords_simpleSymbols()}));
		ignorekeywords = ignorekeywords.concat(getIgnoreKeywords_multiplySymbols({'symbols':getIgnoreKeywords_advancedSymbols()}));
		
		ignorekeywords = ignorekeywords.concat(getIgnoreKeywords_zeroPadSymbols({'symbols':getIgnoreKeywords_allNumberSymbols()}));
		ignorekeywords = ignorekeywords.concat(getIgnoreKeywords_allNumberWords());
		ignorekeywords = ignorekeywords.concat(getIgnoreKeywords_dashReplaceSpaces({'symbols':getIgnoreKeywords_allNumberWords()}));
		
		ignorekeywords = ignorekeywords.concat(getIgnoreKeywords_zeroPadSymbols({'symbols':getIgnoreKeywords_allNumberPlaces()}));
		ignorekeywords = ignorekeywords.concat(getIgnoreKeywords_romanNumerals());
		
		ignorekeywords = ignorekeywords.concat(getIgnoreKeywords_onomatopoeia());
		
		ignorekeywords = ignorekeywords.concat(getIgnoreKeywords_allDecoratedNumberSymbols());
		
		ignorekeywords = ignorekeywords.concat(getIgnoreKeywords_allNumberWordths());
		ignorekeywords = ignorekeywords.concat(getIgnoreKeywords_allNumberWordthlys());
		
		ignorekeywords = ignorekeywords.concat(getIgnoreKeywords_latinAlphabet());
		ignorekeywords = ignorekeywords.concat(getIgnoreKeywords_latinAlphabetDecorated());
		
		ignorekeywords = ignorekeywords.concat(getIgnoreKeywords_allWords());
		
		return ignorekeywords;
	}
	
					// Secondary World-List Builders
					// ---------------------------------------------------------
					// ---------------------------------------------------------
					// ---------------------------------------------------------
	
		/* getIgnoreKeywords_multiplySymbols(args)
		
			Given a list of symbols, returns an array containing repeats of these symbols.
			
			For example, -, --, ---,... *, **, ***.
		
		*/
	
	function getIgnoreKeywords_multiplySymbols(args) {
		var symbols = args.symbols;
		
		var symbolsarray = [];
		
		for(var i = 0; i < symbols.length; i++) {
			var symbol = symbols[i];
			
			symbolsarray = symbolsarray.concat(getIgnoreKeywords_multiplySymbol({'symbol':symbol}));
		}
		
		return symbolsarray;
	}
	
		/* getIgnoreKeywords_multiplySymbol(args)
		
			Given a symbol, return an array containing repeats of that symbol.
			
			For example: -, --, ---, ----, -----, ------.
		
		*/
	
	function getIgnoreKeywords_multiplySymbol(args) {
		var symbol = args.symbol;
		
		var symbolarray = [];
		
		for(var i = 1; i <= 6; i++) {
			symbolarray.push(symbol.repeat(i));
		}
		
		return symbolarray;
	}
	
		/* getIgnoreKeywords_zeroPadSymbols(args)
		
			Given a list of symbols, return an array of their zeropadded values.
			
			For example: 2, 02, 002...., 09, 009, 0009.
		
		*/
	
	function getIgnoreKeywords_zeroPadSymbols(args) {
		var symbols = args.symbols;
		
		var zeropaddedsymbols = [];
		
		for(var i = 0; i < symbols.length; i++) {
			var symbol = symbols[i];
			
			zeropaddedsymbols = zeropaddedsymbols.concat(getIgnoreKeywords_zeroPadSymbol({'symbol':symbol}));
		}
		
		return zeropaddedsymbols;
	}
	
		/* getIgnoreKeywords_zeroPadSymbol(args)
		
			Given a symbol, return an array of multiply-zero-padded symbols of that symbol type.
			
			For example: 1, 01, 001, 0001, 00001, 000001.
		
		*/
	
	function getIgnoreKeywords_zeroPadSymbol(args) {
		var symbol = args.symbol;
		
		var zeropaddedsymbol = [];
		
		for(var i = 0; i <= 6; i++) {
			zeropaddedsymbol.push(pad(symbol, i, '0'));
		}
		
		return zeropaddedsymbol;
	}
	
		/* pad(n, width, z)
		
			Zero-pad or any-pad a string.
			
			For example: 0000001.
		
		*/
	
	function pad(n, width, z) {
		z = z || '0';
		n = n + '';
		return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
	}
	
		/* getIgnoreKeywords_dashReplaceSpaces(args)
		
			Given an array of strings, replace all their spaces with dashes.
			
			For example: nineteen, twenty, twenty-one, twenty-two, etc.
		
		*/
	
	function getIgnoreKeywords_dashReplaceSpaces(args) {
		var symbols = args.symbols;
		
		var dashreplacedsymbols = [];
		
		for(var i = 0; i < symbols.length; i++) {
			var symbol = symbols[i];
			var newsymbol = symbol.replace(/ /g, '-');
			
			if(symbol !== newsymbol) {
				dashreplacedsymbols.push(symbol.replace(/ /g, '-'));
			}
		}
		
		return dashreplacedsymbols;
	}
	
		/* getIgnoreKeywords_allDecoratedNumberSymbols(args)
		
			Get all decorated number symbols for ignoring.
			
			For example: no. 1, pp 2, -1-, *2*, etc..
		
		*/
	
	function getIgnoreKeywords_allDecoratedNumberSymbols(args) {
		var decorargs = {
			'allnumbersymbols':getIgnoreKeywords_zeroPadSymbols({'symbols':getIgnoreKeywords_allNumberSymbols()}),
		};
		
		var decoratednumbersymbols = [];
		
		decoratednumbersymbols = decoratednumbersymbols.concat(getIgnoreKeywords_allDecoratedNumberSymbols_rightDecorations(decorargs));
		decoratednumbersymbols = decoratednumbersymbols.concat(getIgnoreKeywords_allDecoratedNumberSymbols_leftDecorations(decorargs));
		
		var decorargs = {
			'allnumbersymbols':getIgnoreKeywords_romanNumerals(),
		};
		
		decoratednumbersymbols = decoratednumbersymbols.concat(getIgnoreKeywords_allDecoratedNumberSymbols_rightDecorations(decorargs));
		decoratednumbersymbols = decoratednumbersymbols.concat(getIgnoreKeywords_allDecoratedNumberSymbols_leftDecorations(decorargs));
		
		return decoratednumbersymbols;
	}
	
		/* getIgnoreKeywords_allDecoratedNumberSymbols_rightDecorations()
		
			Get all right-of-number decorated numbers for ignoring.
			
			For example: (currently none).
		
		*/
	
	function getIgnoreKeywords_allDecoratedNumberSymbols_rightDecorations(args) {
		var allnumbersymbols = args.allnumbersymbols;
		var allrightnumberdecorations = getIgnoreKeywords_allRightNumberDecorations();
		
		var decoratednumbersymbols = [];
		
		for(var i = 0; i < allrightnumberdecorations.length; i++) {
			var rightnumberdecoration = allrightnumberdecorations[i];
			for(var j = 0; j < allnumbersymbols.length; j++) {
				var numbersymbol = allnumbersymbols[j];
				
				decoratednumbersymbols.push(
					numbersymbol + rightnumberdecoration
				);
				decoratednumbersymbols.push(
					numbersymbol + ' ' + rightnumberdecoration
				);
			}
		}
		
		return decoratednumbersymbols;
	}
	
		/* getIgnoreKeywords_allDecoratedNumberSymbols_leftDecorations()
		
			Get all left-of-number decorated numbers for ignoring.
			
			For example: pp1, pp2, no1, no2, etc..
		
		*/
	
	function getIgnoreKeywords_allDecoratedNumberSymbols_leftDecorations(args) {
		var allnumbersymbols = args.allnumbersymbols;
		var allleftnumberdecorations = getIgnoreKeywords_allLeftNumberDecorations();
		
		var decoratednumbersymbols = [];
		
		for(var i = 0; i < allleftnumberdecorations.length; i++) {
			var leftnumberdecoration = allleftnumberdecorations[i];
			for(var j = 0; j < allnumbersymbols.length; j++) {
				var numbersymbol = allnumbersymbols[j];
				
				decoratednumbersymbols.push(
					leftnumberdecoration + numbersymbol
				);
				decoratednumbersymbols.push(
					leftnumberdecoration + ' ' + numbersymbol
				);
			}
		}
		
		return decoratednumbersymbols;
	}
	
		/* getIgnoreKeywords_allNumberSymbols()
		
			Get all numbers for excluding.
			
			For example: 1, 2, 3, 4, ... 99.
		
		*/
	
	function getIgnoreKeywords_allNumberSymbols() {
		var numbers = [];
		
		for (var i = 0; i < 100; i++) {
			numbers.push(i);
		}
		
		return numbers;
	}
	
		/* getIgnoreKeywords_allNumberPlaces()
		
			Get all number places for excluding.
			
			For example: 1st, 1'th, 1-th, 2nd, 3rd, 4th, 5th, 6th, 7th, etc..
		
		*/
	
	function getIgnoreKeywords_allNumberPlaces() {
		var numbers = [];
		
		for (var i = 0; i < 100; i++) {
			numbers = numbers.concat(getIgnoreKeywords_allNumberPlaces_suffixes_common({'number':i.toString()}));
		}
		
		numbers = numbers.concat(getIgnoreKeywords_allNumberPlaces_suffixes_uncommon());
		
		return numbers;
	}
	
		/* getIgnoreKeywords_allNumberPlaces_suffixes_common()
			
			Get the common suffixes for number-words.
			
			For example: 4th, 5th, 6th, 7th, etc..
			
		*/
	
	function getIgnoreKeywords_allNumberPlaces_suffixes_common(args) {
		var number = args.number;
		
		var commonsuffixes = commonNumberSuffixes();
		
		var commonsuffixnumbers = [];
		
		for(var i = 0; i < commonsuffixes.length; i++) {
			var commonsuffix = commonsuffixes[i];
			
			commonsuffixnumbers = commonsuffixnumbers.concat(getIgnoreKeywords_allNumberPlaces_appendSeparator({
				'number':number,
				'suffix':commonsuffix,
			}));
		}
		
		return commonsuffixnumbers;
	}
	
		/* getIgnoreKeywords_allNumberPlaces_suffixes_uncommon(args)
		
			Get the uncommon suffixes for number-words.
			
			For example: 1st, 2nd, 3rd.
		
		*/
	
	function getIgnoreKeywords_allNumberPlaces_suffixes_uncommon() {
		var uncommonsuffixes = uncommonNumberSuffixes();
		
		var uncommonsuffixnumbers = [];
		
		for(var i = 0; i < uncommonsuffixes.length; i++) {
			var uncommonsuffix = uncommonsuffixes[i];
			
			uncommonsuffixnumbers = uncommonsuffixnumbers.concat(getIgnoreKeywords_allNumberPlaces_appendSeparator({
				'number':(i + 1),
				'suffix':uncommonsuffix,
			}));
		}
		
		return uncommonsuffixnumbers;
	}
	
		/* getIgnoreKeywords_allNumberPlaces_appendSeparator(args)
		
			Get all combinations of a number of a suffix given all types of separators.
			
			For example: 1-st, 1'st, 1 st.
		
		*/
	
	function getIgnoreKeywords_allNumberPlaces_appendSeparator(args) {
		var suffix = args.suffix;
		var number = args.number;
		
		var separators = numberSuffixSeparators();
		
		var suffixwords = [];
		
		for(var i = 0; i < separators.length; i++) {
			var separator = separators[i];
			
			suffixwords.push(number + separator + suffix);
		}
		
		return suffixwords;
	}
	
		/* getIgnoreKeywords_allNumberWordthlys()
		
			Get the "number-wordth-ly" list of ignore words.
			
			For example: firstly, secondly, thirdly, etc..
		
		*/
	
	function getIgnoreKeywords_allNumberWordthlys() {
		var allnumberwordths = getIgnoreKeywords_allNumberWordths();
		
		var allnumberwordthlies = [];
		
		for(var i = 0; i < allnumberwordths.length; i++) {
			var numberwordth = allnumberwordths[i];
			
			allnumberwordthlies.push(numberwordth + 'ly');
		}
		
		return allnumberwordthlies;
	}
	
		/* getIgnoreKeywords_latinAlphabet()
		
			Get the latin alphabet to ignore.
			
			For example: a, b, c, d, e, etc..
		
		*/
	
	function getIgnoreKeywords_latinAlphabet() {
		var latinalphabet = [];
		
		for(var i = 97; i < 123; i++) {		// "a" to "z"
			var letter = String.fromCharCode(i);
			
			latinalphabet.push(letter);
		}
		
		return latinalphabet;
	}
	
		/* getIgnoreKeywords_latinAlphabetDecorated()
			
			Get a fully-decorated latin alphabet to ignore.
			
			For example: a), b), c), -a-, -b-, -c-...
		
		*/
	
	function getIgnoreKeywords_latinAlphabetDecorated() {
		var latinalphabet = getIgnoreKeywords_latinAlphabet();
		
		var decoratedalphabet = [];
		
		for(var i = 0; i < latinalphabet.length; i++) {
			var latinletter = latinalphabet[i];
			var latinlettervariants = getIgnoreKeywords_latinAlphabetDecorated_decorateLetter({'letter':latinletter});
			
			decoratedalphabet = decoratedalphabet.concat(latinlettervariants);
		}
		
		return decoratedalphabet;
	}
	
		/* getIgnoreKeywords_latinAlphabetDecorated_decorateLetter()
		
			Decorate a letter with its variants.
			
			For example a), a], a-, (a, {a, etc..
		
		*/
	
	function getIgnoreKeywords_latinAlphabetDecorated_decorateLetter(args) {
		var letter = args.letter;
		var leftdecorations = getIgnoreKeywords_latinAlphabetDecorated_decorateLetter_leftDecorations();
		var rightdecorations = getIgnoreKeywords_latinAlphabetDecorated_decorateLetter_rightDecorations();
		var dualdecorations = getIgnoreKeywords_latinAlphabetDecorated_decorateLetter_dualDecorations();
		
		var decoratedletters = [];
		
		for(var i = 0; i < leftdecorations.length; i++) {
			var leftdecoration = leftdecorations[i];
			
			decoratedletters.push(leftdecoration + letter);
		}
		
		for(var i = 0; i < rightdecorations.length; i++) {
			var rightdecoration = rightdecorations[i];
			
			decoratedletters.push(letter + rightdecoration);
		}
		
		for(var i = 0; i < dualdecorations.length; i++) {
			var dualdecoration = dualdecorations[i];
			var fullleftdecoration = dualdecoration[0];
			var fullrightdecoration = dualdecoration[1];
			
			decoratedletters.push(fullleftdecoration + letter + fullrightdecoration);
		}
		
		return decoratedletters;
	}
	
		/* getIgnoreKeywords_latinAlphabetDecorated_decorateLetter_leftDecorations()
		
			Get the decorative items that appear to the left of decorated letters.
			
			For example: (, [, {, *...
		
		*/
	
	function getIgnoreKeywords_latinAlphabetDecorated_decorateLetter_leftDecorations() {
		var leftparts = getIgnoreKeywords_latinAlphabetDecorated_decorateLetter_dualDecorations_parts();
		
		leftparts.push('(');
		leftparts.push('[');
		leftparts.push('{');
		
		return leftparts;
	}
	
		/* getIgnoreKeywords_latinAlphabetDecorated_decorateLetter_rightDecorations()
		
			Get the decorative items that appear to the right of decorated letters.
			
			For example: ), ], }, *...
		
		*/
	
	function getIgnoreKeywords_latinAlphabetDecorated_decorateLetter_rightDecorations() {
		var rightparts = getIgnoreKeywords_latinAlphabetDecorated_decorateLetter_dualDecorations_parts();
		
		rightparts.push(')');
		rightparts.push(']');
		rightparts.push('}');
		
		return rightparts;
	}
	
		/* getIgnoreKeywords_latinAlphabetDecorated_decorateLetter_dualDecorations()
		
			Get the decorative items that appear to the left and right of decorated letters.
			
			For example: **, --, [], {}, (), etc..
		
		*/
	
	function getIgnoreKeywords_latinAlphabetDecorated_decorateLetter_dualDecorations() {
		var decorativeparts = getIgnoreKeywords_latinAlphabetDecorated_decorateLetter_dualDecorations_parts();
		
		var dualdecorations = [];
		
		for(var i = 0; i < decorativeparts.length; i++) {
			var decorativepart = decorativeparts[i];
			
			dualdecorations.push([decorativepart, decorativepart]);
		}
		
		dualdecorations.push(['(', ')']);
		dualdecorations.push(['[', ']']);
		dualdecorations.push(['{', '}']);
		
		return dualdecorations;
	}
	
		/* getIgnoreKeywords_romanNumerals()
		
			Get the Roman Numerals to ignore.
			
			For example: iv, iv'ly, iv-ly, (iv), [iv], etc..
		
		*/
	
	function getIgnoreKeywords_romanNumerals() {
		var numerals = getIgnoreKeywords_romanNumerals_numbersOnly();
		var results = [];
		var separators = numberSuffixSeparators();
		
		var separatorscount = separators.length;
		
		for(var i = 0; i < separatorscount; i++) {
			var separator = separators[i];
			
			for(j = 0; j <= 10; j++) {
				var numeral = numerals[j];
				numerals.push(numeral + separator + 'ly');
				numerals.push(numeral + separator + 'th');
				numerals.push('(' + numeral + separator + ')');
				numerals.push('{' + numeral + separator + '}');
				numerals.push('[' + numeral + separator + ']');
			}
		}
		
		return numerals;
	}
	
		/* getIgnoreKeywords_romanNumerals_numbersOnly()
		
			Get a list of Roman numerals to ignore.
			
			For example: i, ii, iii, etc..
		
		*/
	
	function getIgnoreKeywords_romanNumerals_numbersOnly() {
		var digit1 = getRomanNumerals_firstDigitValues();
		var digit2 = getRomanNumerals_secondDigitValues();
		var digit3 = getRomanNumerals_thirdDigitValues();
		var digit4 = getRomanNumerals_fourthDigitValues();
		
		var numerals = digit1;
		
		numerals = getIgnoreKeywords_romanNumerals_mergeLists({'mainlist':digit2, 'mergedlist':numerals});
		numerals = getIgnoreKeywords_romanNumerals_mergeLists({'mainlist':digit3, 'mergedlist':numerals});
		numerals = getIgnoreKeywords_romanNumerals_mergeLists({'mainlist':digit4, 'mergedlist':numerals});
		
		return numerals;
	}
	
		/* getIgnoreKeywords_romanNumerals_mergeLists(args)
		
			Given two lists of roman numerals, merge them together.
			
			For example: (i)x, (ii)x, (iii)x, (iv)x,... (ix)x. etc..
		
		*/
	
	function getIgnoreKeywords_romanNumerals_mergeLists(args) {
		var mainlist = args.mainlist;
		var mergedlist = args.mergedlist;
		
		var mainlistlength = mainlist.length;
		var mergedlistlength = mergedlist.length;
		
		for(var i = 1; i < mainlistlength; i++) {
			var mainlistitem = mainlist[i];
			for(var j = 0; j < mergedlistlength; j++) {
				var mergedlistitem = mergedlist[j];
				mergedlist.push(mainlistitem + mergedlistitem);
			}
		}
		
		return mergedlist;
	}
	
		/* getIgnoreKeywords_onomatopoeia()
		
			Get the onomatopoeia to ignore.
			
			For example: aahhh, oooo, ohhhhh, haaaa, etc..
		
		*/
	
	function getIgnoreKeywords_onomatopoeia() {
		var onolist = [];
		
		onolist = onolist.concat(getIgnoreKeywords_onomatopoeia_singles());
		onolist = onolist.concat(getIgnoreKeywords_onomatopoeia_doubles());
		
		return onolist;
	}
	
		/* getIgnoreKeywords_onomatopoeia_singles()
		
			Get the single-letter onomatopoeia to ignore.
			
			For example: aaa, eeee, oooo, uuuuuu, etc..
		
		*/
	
	function getIgnoreKeywords_onomatopoeia_singles() {
		var onolist = [];
		
		var pieces = getIgnoreKeywords_onomatopoeia_singleLetter();
		var pieceslength = pieces.length;
		
		for(var i = 0; i < pieceslength; i++) {
			var piece = pieces[i];
			onolist = onolist.concat(getIgnoreKeywords_onomatopoeia_singles_list({'ono':piece}));
		}
		
		return onolist;
	}
	
		/* getIgnoreKeywords_onomatopoeia_singles_list()
		
			Get the single-letter onomatopoeia list to ignore.
			
			For example: a, aa, aaa, aaaa, aaaaa, etc..
		
		*/
	
	function getIgnoreKeywords_onomatopoeia_singles_list(args) {
		var ono = args.ono;
		var maxonolength = getMaxOnomatopoeiaLength();
		
		var singlelist = [];
		var word = '';
		
		for(var i = 1; i <= maxonolength; i++) {
			var newword = word + ono;
			singlelist.push(newword);
			word = newword;
		}
		
		return singlelist;
	}
	
		/* getIgnoreKeywords_onomatopoeia_doubles()
		
			Get the double-letter onomatopoeia to ignore.
			
			For example: ahhhhh, ohhhhhhh, eeeeeppppp, eeeekk, etc..
		
		*/
	
	function getIgnoreKeywords_onomatopoeia_doubles() {
		var onolist = [];
		
		var pieces = getIgnoreKeywords_onomatopoeia_doubleLetter();
		var pieceslength = pieces.length;
		
		for(var i = 0; i < pieceslength; i++) {
			var piece = pieces[i];
			onolist = onolist.concat(getIgnoreKeywords_onomatopoeia_doubles_list({'ono':piece}));
		}
		
		return onolist;
	}
	
		/* getIgnoreKeywords_onomatopoeia_doubles_list(args)
		
			Get the double-letter onomatopoeia list to ignore.
			
			For example: ah, ahh, ahhh, ahhhh, ahhhhh, ahhhhhh, etc..
		
		*/
	
	function getIgnoreKeywords_onomatopoeia_doubles_list(args) {
		var ono = args.ono;
		var first = ono[0];
		var second = ono[1];
		var maxonolength = 20;
		
		var singlelist = [];
		var word = '';
		
		for(var i = 1; i <= maxonolength; i++) {
			var newword = word + first;
			singlelist.push(newword);
			
			var nextword = newword;
			
			for(var j = i; j <= maxonolength; j++) {
				nextword += second;
				singlelist.push(nextword);
			}
			word = newword;
		}
		
		return singlelist;
	}
	
		/* getIgnoreKeywords_allNumberWords()
		
			Get a list of number words.
			
			For example: one, two, three, four...
		
		*/
	
	function getIgnoreKeywords_allNumberWords() {
		var allnumberwords = [];
		
		var onehundred = [];
		onehundred = onehundred.concat(getIgnoreKeywords_allNumberWords_firstDigit());
		onehundred = onehundred.concat(getIgnoreKeywords_allNumberWords_upToTwenty());
		onehundred = onehundred.concat(getIgnoreKeywords_allNumberWords_upToNinetyNine());
		
		for(i = 0; i < onehundred.length; i++) {
			var number = onehundred[i];
			allnumberwords.push(number);
		}
		
		allnumberwords = allnumberwords.concat(getIgnoreKeywords_allNumberWords_remainingDigits({'onehundred':onehundred}));
		
		return allnumberwords;
	}
	
		/* getIgnoreKeywords_allNumberWords_upToNinetyNine()
		
			Get all number words from one to ninety nine.
			
			For example: one, two, three...twenty four, twenty five, twenty six, etc..
		
		*/
	
	function getIgnoreKeywords_allNumberWords_upToNinetyNine() {
		var firstdigits = getIgnoreKeywords_allNumberWords_firstDigit();
		var seconddigits = getIgnoreKeywords_allNumberWords_upToNinetyNine_secondDigit();
		
		var firstdigitcount = firstdigits.length;
		var seconddigitcount = seconddigits.length;
		
		var onehundredlist = [];
		
		for(var i = 0; i < seconddigitcount; i++) {
			var seconddigit = seconddigits[i];
			
			onehundredlist.push(seconddigit);
			
			for(var j = 0; j < firstdigitcount; j++) {
				var firstdigit = firstdigits[j];
				
				var word = seconddigit + ' ' + firstdigit;
				
				onehundredlist.push(word);
			}
		}
		
		return onehundredlist;
	}
	
		/* getIgnoreKeywords_allNumberWords_remainingDigits(args)
			
			Get the remaining digits to ignore.
			
			For example: one thousand, fifty five hundred, seventy eight million, etc..
			
		*/
	
	function getIgnoreKeywords_allNumberWords_remainingDigits(args) {
		var onehundred = args.onehundred;
		
		var increments = getIgnoreKeywords_allNumberWords_remainingDigits_baseIncrements();
		
		var allremainingnumbers = [];
		
		for(var i = 0; i < increments.length; i++) {
			var increment = increments[i];
			
			for(var j = 0; j < onehundred.length; j++) {
				var number = onehundred[j];
				
				var numberword = number + ' ' + increment;
				
				allremainingnumbers.push(numberword);
			}
		}
		
		return allremainingnumbers;
	}
	
		/* getIgnoreKeywords_allNumberWordths()
		
			Get numbereth words.
			
			For example: first, second, third, fourth, etc..
		
		*/
	
	function getIgnoreKeywords_allNumberWordths() {
		var allnumberwords = [];
		
		var firstdigits = getIgnoreKeywords_allNumberWordths_firstDigit();
		firstdigits = firstdigits.concat(getIgnoreKeywords_allNumberWordths_upToTwenty());
		
		var seconddigits = getIgnoreKeywords_allNumberWords_upToNinetyNine_secondDigit();
		
		var firstdigitscount = firstdigits.length;
		var seconddigitscount = seconddigits.length;
		
		for(var i = 0; i < firstdigitscount; i++) {
			var firstdigit = firstdigits[i];
			
			allnumberwords.push(firstdigit);
		}
		
		for(var i = 0; i < seconddigitscount; i++) {
			var seconddigit = seconddigits[i];
			
			allnumberwords.push(seconddigit);
			
			for(var j = 0; j < firstdigitscount; j++) {
				var firstdigit = firstdigits[i];
				
				allnumberwords.push(seconddigit + ' ' + firstdigit);
				allnumberwords.push(seconddigit + '-' + firstdigit);
			}
		}
		
		return allnumberwords;
	}
	
					// Secondary Word-Lists
					// ---------------------------------------------------------
					// ---------------------------------------------------------
					// ---------------------------------------------------------
	
		/* getIgnoreKeywords_allRightNumberDecorations()
		
			Get all symbols that typically decorate the right side of a number.
			
			For example: (currently none)
		
		*/
	
	function getIgnoreKeywords_allRightNumberDecorations() {
		return [
		];
	}
	
		/* getIgnoreKeywords_allLeftNumberDecorations()
		
			Get all symbols that typically decorate the left side of a number.
			
			For example: pp, pg, no, etc..
		
		*/
	
	function getIgnoreKeywords_allLeftNumberDecorations() {
		return [
			'n',
			'no',
			'nos',
			'no\'s',
			'num',
			'number',
			'pg',
			'pgs',
			'pp',
			'pps',
		];
	}
	
		/* getIgnoreKeywords_spaces()
		
			Get spaces to ignore.
			
			For example: (weird UTF-8 spaces)
		
		*/
	
	function getIgnoreKeywords_spaces() {
		return [			
			'',
			'',
		];
	}
	
		/* getIgnoreKeywords_simpleSymbols()
		
			Get a list of simple symbols which, themselves or multiples of, should never be listed as keywords.
			
			For example: ., !, ?, @, :, ;, #, etc..
		
		*/
	
	function getIgnoreKeywords_simpleSymbols() {
		return [
			'.',
			'!',
			'?',
			'@',
			',',
			':',
			';',
			'#',
			'=',
			'\'',
			'"',
			'/',
			'\\',
			'&',
			'\'',
			'*',
			'^',
		];
	}
	
		/* getIgnoreKeywords_advancedSymbols()
		
			Get a list of advanced symbols which behave largely like the simple symbols, except they are more exceptional.
			
			For example: …, ↑, ⚘, §, ¶, etc..
		
		*/
	
	function getIgnoreKeywords_advancedSymbols() {
		return [
			'­',
			'-',
			'–',
			'_',
			'—',
			'…',
			'↑',
			'⚘',
			'§',
			'¶',
		];
	}
	
		/* commonNumberSuffixes()
		
			Get a list of common number suffixes.
			
			For example: th, as in "5th".
		
		*/
	
	function commonNumberSuffixes() {
		return [
			'th',		// 4th
		];
	}
	
		/* uncommonNumberSuffixes()
		
			Get a list of uncommon number suffixes.
			
			These must be ordered accordingly: 0=>st ("1st"), 1=>nd ("2nd"), 2=>rd("3rd").
			
			For example: 'st', 'nd', 'rd'.
		
		*/
	
	function uncommonNumberSuffixes() {
		return [
			'st',		// 1st
			'nd',		// 2nd
			'rd',		// 3rd
		];
	}
	
		/* numberSuffixSeparators()
		
			Get the separators found between a number and its suffix.
			
			For example: "-" as in "5-th", or "'" as in "6'thly", etc..
		
		*/
	
	function numberSuffixSeparators() {
		return [
			'',
			'\'',
			'-',
		];
	}
	
		/* getIgnoreKeywords_latinAlphabetDecorated_decorateLetter_dualDecorations_parts()
		
			Get decorator parts for latin letters.
			
			For example: " as in "a", - as in -b-, * as in *c*, etc..
		
		*/
	
	function getIgnoreKeywords_latinAlphabetDecorated_decorateLetter_dualDecorations_parts() {
		return [
			'\'',
			'\'\'',
			'"',
			'-',
			'*',
		];
	}
	
		/* getIgnoreKeywords_allNumberWords_firstDigit()
		
			Get all, single-digit number words to ignore.
			
			For example: one, two, three, four, etc..
		
		*/
	
	function getIgnoreKeywords_allNumberWords_firstDigit() {
		return [
			'one',
			'two',
			'three',
			'four',
			'five',
			'six',
			'seven',
			'eight',
			'nine',
		];
	}
	
		/* getIgnoreKeywords_allNumberWords_upToTwenty()
		
			Get all number words up to twenty to ignore.
			
			For example: ten, eleven, twelve, thirteen, etc..
		
		*/
	
	function getIgnoreKeywords_allNumberWords_upToTwenty() {
		return [
			'ten',
			'eleven',
			'twelve',
			'thirteen',
			'fourteen',
			'fifteen',
			'sixteen',
			'seventeen',
			'eighteen',
			'nineteen',
			'twenty',
		];
	}
	
		/* getIgnoreKeywords_allNumberWords_upToNinetyNine_secondDigit()
		
			Get all number words second-digit increment to ignore and concat with others to ignore.
			
			For example: twenty, thirty, forty, fifty, sixty, etc..
		
		*/
	
	function getIgnoreKeywords_allNumberWords_upToNinetyNine_secondDigit() {
		return [
			'twenty',
			'thirty',
			'forty',
			'fifty',
			'sixty',
			'seventy',
			'eighty',
			'ninety',
		];
	}
	
		/* getIgnoreKeywords_allNumberWords_remainingDigits_baseIncrements()
		
			Get additional base increments for the "one to ninety" lists.
			
			For example: hundred, thousand, million, etc..
		
		*/
	
	function getIgnoreKeywords_allNumberWords_remainingDigits_baseIncrements() {
		return [
			'hundred',
			'thousand',
			'million',
		];
	}
	
		/* getIgnoreKeywords_allNumberWordths_firstDigit()
		
			Get all number'th words of the first digit to ignore.
			
			For example: first, second, third, fourth, fifth, sixth, etc..
		
		*/
	
	function getIgnoreKeywords_allNumberWordths_firstDigit() {
		return [
			'first',
			'second',
			'third',
			'fourth',
			'fifth',
			'sixth',
			'seventh',
			'eighth',
			'ninth',
		];
	}
	
		/* getIgnoreKeywords_allNumberWordths_upToTwenty()
		
			Get all number'th words up to twenty to ignore.
			
			For example: tenth, eleventh, twelfth, thirteenth, fourteenth, etc..
		
		*/
	
	function getIgnoreKeywords_allNumberWordths_upToTwenty() {
		return [
			'tenth',
			'eleventh',
			'twelfth',
			'thirteenth',
			'fourteenth',
			'fifteenth',
			'sixteenth',
			'seventeeth',
			'eighteenth',
			'ninteenth',
			'twentieth',
		];
	}
	
		/* getRomanNumerals_firstDigitValues()
		
			Get the first digit (0-9) values for the Roman Numeral system.
			
			For example: (nothing; i.e., zero), i, ii, iii, etc..
		
		*/
	
	function getRomanNumerals_firstDigitValues() {
		return [
			'',
			'i',
			'ii',
			'iii',
			'iv',
			'v',
			'vi',
			'vii',
			'viii',
			'ix',
		];
	}
	
		/* getRomanNumerals_secondDigitValues()
		
			Get the second digit (00-90) values for the Roman Numeral system.
			
			For example: (nothing; i.e., zero), x (10), xx (20), xxx (30), etc..
		
		*/

	function getRomanNumerals_secondDigitValues() {
		return [
			'',
			'x',
			'xx',
			'xxx',
			'xl',
			'l',
			'lx',
			'lxx',
			'lxxx',
			'xc',
		];
	}
	
		/* getRomanNumerals_thirdDigitValues()
		
			Get the third digit (000-900) values for the Roman Numeral system.
			
			For example: (nothing; i.e., zero), c (100), cc (200), ccc (300), etc..
		
		*/

	function getRomanNumerals_thirdDigitValues() {
		return [
			'',
			'c',
			'cc',
			'ccc',
			'cd',
			'd',
			'dc',
			'dcc',
			'dccc',
			'cm',
		];
	}
	
		/* getRomanNumerals_fourthDigitValues()
		
			Get the fourth digit (0000-9000) values for the Roman Numeral system.
			
			For example: (nothing; i.e., zero), m (1000), mm (2000), mmm (3000), etc..
		
		*/

	function getRomanNumerals_fourthDigitValues() {
		return [
			'',
			'm',
			'mm',
			'mmm',
		];
	}
	
		/* getIgnoreKeywords_onomatopoeia_singleLetter()
		
			Get the single letter onomatopoeia letters.
			
			Excluded words will be made from multiple strings of varying length of this concated letter, for instance: mmmm, uuuuuuuu, aa, ooo.
			
			For example: a, e, m, o, u.
		
		*/
	
	function getIgnoreKeywords_onomatopoeia_singleLetter() {
		return [
			'a',
			'e',
			'm',
			'o',
			'u',
		];
	}
	
		/* getIgnoreKeywords_onomatopoeia_doubleLetter()
		
			Get the doubl eletter onomatopoeia letters.
			
			For example: [a,h] ("ahhhhh"), [e,k] ("eeeek"), [h,m] ("hhhhhmmmmmm"), [o,h] ("ohhhhhhhh"), etc..
		
		*/
	
	function getIgnoreKeywords_onomatopoeia_doubleLetter() {
		return [
			[
				'a',
				'h',
			],
			[
				'e',
				'k',
			],
			[
				'e',
				'p',
			],
			[
				'h',
				'm',
			],
			[
				'n',
				'o',
			],
			[
				'o',
				'h',
			],
			[
				'u',
				'h',
			],
		];
	}
	
					// Master Words Ignore-List
					// ---------------------------------------------------------
					// ---------------------------------------------------------
					// ---------------------------------------------------------
	
		/* getIgnoreKeywords_allWords()
		
			Concat together the master-list of hand-chosen, common-words for exclusion.
		
		*/
	
	function getIgnoreKeywords_allWords() {
		var ignorekeywords = [];
		
		ignorekeywords = ignorekeywords.concat(getIgnoreKeywords_allWords_symbolWords());
		ignorekeywords = ignorekeywords.concat(getIgnoreKeywords_allWords_numberWords());
		ignorekeywords = ignorekeywords.concat(getIgnoreKeywords_allWords_A_Words());
		ignorekeywords = ignorekeywords.concat(getIgnoreKeywords_allWords_B_Words());
		ignorekeywords = ignorekeywords.concat(getIgnoreKeywords_allWords_C_Words());
		ignorekeywords = ignorekeywords.concat(getIgnoreKeywords_allWords_D_Words());
		ignorekeywords = ignorekeywords.concat(getIgnoreKeywords_allWords_E_Words());
		ignorekeywords = ignorekeywords.concat(getIgnoreKeywords_allWords_F_Words());
		ignorekeywords = ignorekeywords.concat(getIgnoreKeywords_allWords_G_Words());
		ignorekeywords = ignorekeywords.concat(getIgnoreKeywords_allWords_H_Words());
		ignorekeywords = ignorekeywords.concat(getIgnoreKeywords_allWords_I_Words());
		ignorekeywords = ignorekeywords.concat(getIgnoreKeywords_allWords_J_Words());
		ignorekeywords = ignorekeywords.concat(getIgnoreKeywords_allWords_K_Words());
		ignorekeywords = ignorekeywords.concat(getIgnoreKeywords_allWords_L_Words());
		ignorekeywords = ignorekeywords.concat(getIgnoreKeywords_allWords_M_Words());
		ignorekeywords = ignorekeywords.concat(getIgnoreKeywords_allWords_N_Words());
		ignorekeywords = ignorekeywords.concat(getIgnoreKeywords_allWords_O_Words());
		ignorekeywords = ignorekeywords.concat(getIgnoreKeywords_allWords_P_Words());
		ignorekeywords = ignorekeywords.concat(getIgnoreKeywords_allWords_Q_Words());
		ignorekeywords = ignorekeywords.concat(getIgnoreKeywords_allWords_R_Words());
		ignorekeywords = ignorekeywords.concat(getIgnoreKeywords_allWords_S_Words());
		ignorekeywords = ignorekeywords.concat(getIgnoreKeywords_allWords_T_Words());
		ignorekeywords = ignorekeywords.concat(getIgnoreKeywords_allWords_U_Words());
		ignorekeywords = ignorekeywords.concat(getIgnoreKeywords_allWords_V_Words());
		ignorekeywords = ignorekeywords.concat(getIgnoreKeywords_allWords_W_Words());
		ignorekeywords = ignorekeywords.concat(getIgnoreKeywords_allWords_X_Words());
		ignorekeywords = ignorekeywords.concat(getIgnoreKeywords_allWords_Y_Words());
		ignorekeywords = ignorekeywords.concat(getIgnoreKeywords_allWords_Z_Words());
		ignorekeywords = ignorekeywords.concat(getIgnoreKeywords_allWords_nonEnglishWords());
		
		return ignorekeywords;
	}
	
		/* getIgnoreKeywords_allWords_symbolWords()
		
			Get the common words to ignore that start with: a symbol.
		
		*/

	function getIgnoreKeywords_allWords_symbolWords() {
		return [
			'\'em',
			'\'gainst',
			'\'neath',
			'\'round',
			'\'tis',
			'\'twere',
		];
	}
	
		/* getIgnoreKeywords_allWords_numberWords()
		
			Get the common words to ignore that start with: a number.
		
		*/
	
	function getIgnoreKeywords_allWords_numberWords() {
		return [
		];
	}
	
		/* getIgnoreKeywords_allWords_A_Words()
		
			Get the common words to ignore that start with: A.
		
		*/
	
	function getIgnoreKeywords_allWords_A_Words() {
		return [
			'ab',	// latin, as in "ab novo"
			'abideth',
			'able',
			'above',
			'about',
			'absolutely',
			'according',
			'accordingly',	
			'achieving',
			'across',
			'actual',
			'actually',	
			'admit',
			'admittably',
			'admitted',
			'affect',
			'affecting',
			'affects',
			'aforesaid',
			'after',	
			'afterall',
			'afterward',
			'afterwards',
			'again',
			'against',
			'ago',
			'agree',	
			'agreed',
			'agrees',
			'agreeing',
			'ah',
			'ahh',
			'ahhh',	
			'ahhhh',
			'ahhhhh',
			'ahhhhhh',
			'ahhhhhhh',
			'ahead',
			'al', // "et al"
			'alas',
			'albeit',
			'alike',
			'all',
			'allage',
			'alleged',
			'allegedly',
			'allow',
			'almost',
			'aloft',
			'along',
			'already',
			'also',
			'although',
			'altogether',
			'always',
			'am',		
			'amid',
			'amidst',
			'among',
			'amongst',	
			'amount',
			'amounting',
			'amounts',
			'amuck',
			'an',
			'and',
			'another',
			'any',
			'anyhow',
			'anymore',
			'anyway',
			'apart',
			'apparent',
			'apparently',
			'appear',
			'appeared',
			'appearing',
			'appears',
			'apply',
			'are',
			'around',
			'as',
			'aside',
			'ask',
			'aspect',
			'aspects',
			'ass\'n', // "assistant"
			'assume',
			'assumed',
			'assumes',
			'assuming',
			'at',
			'attributable',
			'au', // "au contraire"
			'augers', // "augers well"
			'aught',
			'away',
			'awhile',
			'aye',
		];
	}
	
		/* getIgnoreKeywords_allWords_B_Words()
		
			Get the common words to ignore that start with: B.
		
		*/
	
	function getIgnoreKeywords_allWords_B_Words() {
		return [
			'back',
			'backward',
			'badly',
			'barely',
			'based',
			'basically',
			'be',
			'became',
			'because',
			'become',
			'becoming',
			'becomes',
			'been',
			'before',
			'beforehand',
			'began',
			'behalf',
			'beheld',
			'behind',
			'behold',
			'beholding',
			'being',
			'believe',
			'beneath',
			'beside',
			'besides',
			'better',
			'between',
			'betwixt',
			'both',
			'bout',
			'beyond',
			'bid',
			'brief',
			'briefly',
			'bring',
			'bringing',
			'brings',
			'briskly',
			'brought',
			'but',
			'by',
		];
	}
	
		/* getIgnoreKeywords_allWords_C_Words()
		
			Get the common words to ignore that start with: C.
		
		*/
	
	function getIgnoreKeywords_allWords_C_Words() {
		return [
			'call',
			'called',
			'came',
			'can',
			'can\'t',
			'cannot',
			'case',
			'certain',
			'certainly',
			'cetera', // LATIN
			'chapter',
			'chiefly',
			'circumstances',
			'claim',
			'claims',
			'clearly',
			'closely',
			'closer',
			'co',	// i.e., company
			'come',
			'comes',
			'cometh',
			'coming',
			'commit',
			'committed',
			'committing',
			'commits',
			'completely',
			'concerned',
			'concerns',
			'concerning',
			'condition',
			'consequently',	
			'consider',
			'considerable',
			'considered',
			'considering',
			'consist',
			'consisted',
			'consisting',
			'consists',
			'constantly',
			'constitute',
			'constituted',
			'constitutes',
			'constituting',
			'contain',
			'contained',
			'contains',
			'containing',
			'continually',
			'continuously',
			'contraire', // "au contraire"
			'contrarily',
			'contrary',
			'could',
			'couldn\'t',
			'culpa', // "mea culpa"
			'currently',
		];
	}
	
		/* getIgnoreKeywords_allWords_D_Words()
		
			Get the common words to ignore that start with: D.
		
		*/
	
	function getIgnoreKeywords_allWords_D_Words() {
		return [
			'd\'you',
			'daily',
			'daresay',
			'day',
			'de',	 // new, "De facto", "De Jure", Latin, etc.
			'dear',
			'declare',
			'declared',
			'definitely',
			'deg',	// degree
			'describe',
			'describes',
			'despite',
			'determine',
			'determined',
			'determines',
			'determining',
			'did',
			'didn\'t',
			'do',
			'does',
			'doesn\'t',
			'doing',
			'done',
			'don\'t',
			'dost',	// dost thou toketh?
			'doth',
			'doubtless',
			'doubtlessly',
			'down',
			'downright',
			'dozen',
			'duly',	
			'during',
		];
	}
	
		/* getIgnoreKeywords_allWords_E_Words()
		
			Get the common words to ignore that start with: E.
		
		*/
	
	function getIgnoreKeywords_allWords_E_Words() {
		return [
			'each',	
			'earlier',
			'earlieriest',
			'early',
			'easily',
			'ect',	
			'effect',
			'effecting',
			'effects',
			'eg', // i.e, "e.g."
			'end',
			'ends',
			'entire',
			'either',
			'else',
			'else',
			'else\'s',
			'elsewhere',
			'en', // as in "en gros"
			'enough',
			'entirely',
			'ere',	// short for "here"
			'erstwhile',
			'especially',
			'essentially',
			'et', // "et al"
			'etc',
			'even',
			'eventually',
			'ever',
			'every',
			'evident',
			'evidently',
			'exactly',
			'example',
			'examples',
			'except',
			'excepted',
			'excepting',
			'excepts',
			'exception',
			'exceptions',
			'exclusively',
			'exercising',
			'exist',
			'exists',
			'expense',
			'explicitly',
			'extent',
			'externally',
			'extremely',
		];
	}
	
		/* getIgnoreKeywords_allWords_F_Words()
		
			Get the common words to ignore that start with: F.
		
		*/
	
	function getIgnoreKeywords_allWords_F_Words() {
		return [
			'faced',
			'faces',
			'facing',
			'fact',
			'facto',
			'facts',
			'fairly',
			'false',
			'far',
			'farther',
			'few',
			'finally',
			'find',
			'finds',
			'finding',
			'findings',
			'five',
			'former',
			'formerly',
			'found',
			'founded',
			'founds',
			'for',
			'force',
			'forefront',
			'foremost',
			'foreswearing',
			'former',
			'formidably',
			'forth', // "go forth"
			'forthwith',
			'four',
			'frankly',
			'frequently',
			'fro',	// old timey "to and fro"
			'from',
			'full',
			'fully',
			'further',
			'furthermore',
		];
	}
	
		/* getIgnoreKeywords_allWords_G_Words()
		
			Get the common words to ignore that start with: G.
		
		*/
	
	function getIgnoreKeywords_allWords_G_Words() {
		return [
			'gave',
			'general',
			'generally',
			'generic',
			'get',
			'gets',
			'getting',
			'give',
			'given',
			'gives',
			'go',
			'goes',
			'going',
			'goings',
			'goings-on',
			'goingson',
			'goodbye',
			'goodly',
			'got',	
			'gotten',
			'gradually',
			'great deal',
			'greater',
			'gros', // "en gros"
			'grossly',
		];
	}
	
		/* getIgnoreKeywords_allWords_H_Words()
		
			Get the common words to ignore that start with: H.
		
		*/
	
	function getIgnoreKeywords_allWords_H_Words() {
		return [
			'ha',
			'had',
			'hadn\'t',
			'half',
			'happen',
			'happened',
			'happens',
			'hardly',
			'has',
			'hast',	// "hast thou toketh?"
			'hath',
			'have',
			'haven\'t',
			'having',
			'he',
			'he\'d',
			'he\'ll',
			'he\'s',
			'held',
			'hello',
			'hence',
			'henceforth',
			'her',
			'here',
			'here\'s',
			'hereafter',
			'hereby',
			'herein',
			'heretofore',
			'hers',
			'herself',
			'highly',
			'him',
			'himself',
			'his',
			'hither',
			'hitherto',
			'hold',
			'holding',
			'how',
			'how\'s',
			'how\'ll',
			'however',
			'hundreds',
		];
	}
	
		/* getIgnoreKeywords_allWords_I_Words()
		
			Get the common words to ignore that start with: I.
		
		*/
	
	function getIgnoreKeywords_allWords_I_Words() {
		return [
			'i',
			'i\'d',	
			'i\'ll',
			'i\'m',	
			'i\'ve',
			'ibid',
			'ibidum',
			'ie', // "i.e."
			'if',
			'im',	
			'imagined',
			'imagines',
			'imagining',
			'immediately',
			'implicitly',
			'implied',
			'implies',
			'imply',
			'incomparably',
			'increasingly',
			'indeed',
			'inevitably',
			'instance',
			'into',
			'in',	
			'inasmuch',
			'include',
			'included',
			'including',
			'infer',
			'inferred',
			'inferring',
			'inside',
			'insofar',
			'instead',
			'insuch',
			'internally',
			'invariably',
			'irregardless',
			'irregardlessly',
			'irrespective',
			'irrespectively',
			'is',
			'isn\'t',
			'issue',
			'it',
			'its',	
			'it\'s',
			'itself',
			'ised', // as in "anarchist-ised" (British-spelling-variant)
			'ized', // as in "anarchist-ized"
		];
	}
	
		/* getIgnoreKeywords_allWords_J_Words()
		
			Get the common words to ignore that start with: J.
		
		*/
	
	function getIgnoreKeywords_allWords_J_Words() {
		return [
			'jure', // "De Jure", etc.
		];
	}
	
		/* getIgnoreKeywords_allWords_K_Words()
		
			Get the common words to ignore that start with: K.
		
		*/
	
	function getIgnoreKeywords_allWords_K_Words() {
		return [
			'keep',
			'keeping',
			'keeps',
			'kept',
			'kind',
			'kinds',
			'km', // "kilometer", metric system
			'knew',
			'know',
			'knowing',
			'knows',
		];
	}
	
		/* getIgnoreKeywords_allWords_L_Words()
		
			Get the common words to ignore that start with: L.
		
		*/
	
	function getIgnoreKeywords_allWords_L_Words() {
		return [
			'lack',	
			'lacks',
			'lacking',
			'largely',
			'larger',
			'largest',
			'last',	
			'lastly',
			'latest',
			'latter',
			'la', // french
			'lat',	// latitude
			'late',
			'lately',
			'later',
			'le', // french
			'least',
			'leave',
			'les', // french
			'less',
			'lest',
			'let',
			'let\'s',
			'lets',
			'like',
			'likely',
			'likes',
			'likewise',
			'literally',
			'little',
			'lo',
			'lo\'',
			'long',
			'longer',
			'longest',
			'longing',
			'look',
			'looked',
			'looking',
			'looks',
			'ltd',	
			'luckily',
		];
	}
	
		/* getIgnoreKeywords_allWords_M_Words()
		
			Get the common words to ignore that start with: M.
		
		*/
	
	function getIgnoreKeywords_allWords_M_Words() {
		return [
			'm\'m',
			'made',
			'make',
			'makes',
			'making',
			'main',	
			'mainly',
			'man\'s',
			'many',
			'may',	
			'maybe',
			'me',
			'mea',	 // "mea culpa"
			'mean',
			'means',
			'meant',
			'meantime',
			'meanwhile',
			'mere',
			'merely',
			'messrs',
			'met',
			'midst',
			'midsts',
			'min',
			'minor',
			'miss',
			'mister',
			'mlle', // french
			'mme', // french
			'moment',
			'more',
			'moreover',
			'morrow',
			'most',
			'mostly',
			'mr',
			'mrs',
			'much',
			'must',	
			'my',
			'myself',
		];
	}
	
		/* getIgnoreKeywords_allWords_N_Words()
		
			Get the common words to ignore that start with: N.
		
		*/
	
	function getIgnoreKeywords_allWords_N_Words() {
		return [
			'name',	
			'namely',
			'naturally',
			'naught',
			'nay',
			'ne',
			'ne\'er',
			'near',	
			'nearest',
			'nearly',
			'necessarily',
			'needs',
			'neither',
			'never',
			'nevertheless',
			'new',
			'next',
			'nil',
			'no',
			'nobody',
			'non', // latin
			'none',
			'nonetheless',
			'nor',	
			'normally',
			'not',
			'notably',
			'notwith',
			'notwithstanding',
			'nouveau', // french
			'nouveaux', // french
			'novo', // latin
			'now',
			'nowaday',
			'nowadays',
		];
	}
	
		/* getIgnoreKeywords_allWords_O_Words()
		
			Get the common words to ignore that start with: O.
		
		*/
	
	function getIgnoreKeywords_allWords_O_Words() {
		return [
			'obstinately',
			'obviously',
			'occasion',
			'occasionally',
			'occassion',
			'occassionally',
			'occur',
			'occuring',
			'occurs',
			'occurred',
			'of',
			'off',
			'oft',
			'often',
			'oftener',
			'oh',
			'ol',
			'ole',
			'on',
			'once',
			'one',
			'one\'s',
			'ones',
			'oneself',
			'only',
			'onto',
			'or',
			'ordinarily',
			'originally',
			'other',
			'others',
			'otherwise',
			'ought',
			'our',
			'ourselves',
			'out',
			'outright',
			'outside',
			'o\'er',
			'over',
			'overlooks',
			'owe',
			'owed',
			'owes',
			'owing',
			'own',
		];
	}
	
		/* getIgnoreKeywords_allWords_P_Words()
		
			Get the common words to ignore that start with: P.
		
		*/
	
	function getIgnoreKeywords_allWords_P_Words() {
		return [
			'paces',
			'pacing',
			'par',
			'part',
			'parted',
			'partly',
			'parts',
			'parting',
			'particular',
			'particularly',
			'passed',
			'passing',
			'passings',
			'patiently',
			'peculiarly',
			'per',
			'perchance',
			'perhaps',
			'pg', // "page"
			'pgs', // "pages"
			'place',
			'places',
			'placing',
			'possible',
			'possibly',
			'pour', // portuguese
			'pp',
			'practically',
			'precede',
			'precedes',
			'preceding',
			'precisely',
			'prefer',
			'prefers',
			'preliminary',
			'pre',
			'present',
			'presently',
			'presume',
			'presumably',
			'presuming',
			'presumingly',
			'presuppose',
			'presupposes',
			'presupposing',
			'previously',
			'pro',
			'probable',
			'probably',
			'proceed',
			'proceeding',
			'proceeds',
			'proportionately',
			'pull',	
			'pulled',
			'pulling',
			'pulls',
			'put',
			'puts',
			'putting',
			'puts',
		];
	}
	
		/* getIgnoreKeywords_allWords_Q_Words()
		
			Get the common words to ignore that start with: Q.
		
		*/
	
	function getIgnoreKeywords_allWords_Q_Words() {
		return [
			'quickly',
			'quite',
			'quo',
		];
	}
	
		/* getIgnoreKeywords_allWords_R_Words()
		
			Get the common words to ignore that start with: R.
		
		*/
	
	function getIgnoreKeywords_allWords_R_Words() {
		return [
			'rarely',
			'rather',
			'readily',
			'realize',
			'realized',
			'realizes',
			'realizing',
			'really',
			'recent',
			'recently',
			'recieved',
			'recieves',
			'recieving',
			'reckon',
			'reckoned',
			'regard',
			'regarded',
			'regarding',
			'regardless',
			'regardlessly',
			'regards',
			'relatively',
			'remain',
			'remained',
			'remaining',
			'remains',
			'remind',
			'requisite',
			'represents',
			'resulting',
			'rid',
		];
	}
	
		/* getIgnoreKeywords_allWords_S_Words()
		
			Get the common words to ignore that start with: S.
		
		*/
	
	function getIgnoreKeywords_allWords_S_Words() {
		return [
			'said',
			'sake',
			'same',
			'saw',
			'say',
			'saying',
			'says',	
			'scarcely',
			'see',
			'seeing',
			'seen',
			'sees',
			'seek',
			'seeked',
			'seeks',
			'seem',	
			'seemed',
			'seeming',
			'seemingly',
			'seems',
			'seldom',
			'send',
			'sending',
			'sends',
			'sent',
			'separate',
			'separated',
			'separates',
			'separating',
			'set',
			'several',
			'shall',
			'shalt',
			'she',
			'she\'d',
			'she\'ll',
			'she\'s',
			'sheer',
			'shew',
			'short',
			'shorter',
			'shortest',
			'shortly',
			'should',
			'show',	
			'shows',
			'sic',	
			'side',	
			'sides',
			'siding',
			'signifies',
			'simply',
			'simultaneosly',
			'since',
			'sincerely',
			'slightly',
			'slowly',
			'so',
			'so-called',
			'socalled',
			'some',
			'somebody',
			'someone',
			'somewhat',
			'soon',
			'some',
			'somehow',
			'something',
			'sometimes',
			'sorts',
			'sought',
			'specially',
			'st',
			'stated',
			'steadily',
			'still',
			'stop',
			'strictly',
			'sturm', // german, 'sturm und drang'
			'subject',
			'such',
			'sudden',
			'suddenly',
			'suppose',
			'supposed',
			'supposedly',
			'supposes',
			'supposing',
			'sure',
			'surely',
		];
	}
	
		/* getIgnoreKeywords_allWords_T_Words()
		
			Get the common words to ignore that start with: T.
		
		*/
	
	function getIgnoreKeywords_allWords_T_Words() {
		return [
			'take',	
			'taken',
			'takes',
			'taking',
			'technically',
			'tell',
			'telling',
			'tellingly',
			'tells',
			'temporarily',
			'tend',
			'tends',
			'than',
			'that',
			'that\'s',
			'the',
			'thee',	
			'their',
			'theirs',
			'them',
			'themselves',
			'then',
			'thence',
			'thenceforth',
			'there',
			'there\'ll',
			'there\'s',
			'thereabouts',
			'thereafter',
			'thereby',
			'therefor',
			'therefore',
			'therefrom',
			'therein',
			'thereof',
			'thereover',
			'these',
			'they',
			'they\'d',
			'they\'ll',
			'they\'re',
			'they\'ve',
			'thine',
			'thing',
			'things',
			'this',
			'thither',
			'thorough',
			'thoroughly',
			'those',
			'thou',
			'though',
			'thousands',
			'three',
			'through',
			'throughout',
			'thus',
			'thy',
			'thyself',
			'time',
			'tis',
			'to',
			'today',
			'together',
			'told',
			'tonight',
			'too',
			'took',
			'topic',
			'total',
			'totalled',
			'totally',
			'toward',
			'towards',
			'tried',
			'true',	
			'truly',
			'try',
			'trying',
			'turn',
			'turned',
			'turning',
			'turns',
			'two',
		];
	}
	
		/* getIgnoreKeywords_allWords_U_Words()
		
			Get the common words to ignore that start with: U.
		
		*/
	
	function getIgnoreKeywords_allWords_U_Words() {
		return [
			'ultimately',
			'unable',
			'unconsciously',
			'undeniably',
			'under',
			'underlying',
			'undoubtedly',
			'unduly',
			'unfortunately',
			'unless',
			'unlike',
			'unlikely',
			'unlimitedly',
			'unspeakably',
			'utterly',
			'und', // german, "sturm und drang"
			'until',
			'unto',
			'up',
			'upon',
			'us',
			'use',
			'used',
			'using',
			'usually',
			'utmost',
			'utter',
		];
	}
	
		/* getIgnoreKeywords_allWords_V_Words()
		
			Get the common words to ignore that start with: v.
		
		*/
	
	function getIgnoreKeywords_allWords_V_Words() {
		return [
			'variably',
			'various',
			'verily',
			'very',
			'view',	
			'views',
			'virtually',
			'viz',
		];
	}
	
		/* getIgnoreKeywords_allWords_W_Words()
		
			Get the common words to ignore that start with: W.
		
		*/
	
	function getIgnoreKeywords_allWords_W_Words() {
		return [
			'wait',
			'waited',
			'waiting',
			'waits',
			'want',
			'was',
			'wasn\'t',
			'way',
			'ways',
			'we',
			'we\'d',
			'we\'ll',
			'we\'re',
			'we\'ve',
			'well',
			'went',
			'were',
			'what',
			'what\'s',
			'whatever',
			'whathaveyou',
			'whatsoever',
			'when',
			'whence',
			'whenever',
			'where',
			'where\'s',
			'whereas',
			'whereby',
			'wherefore',
			'wherefrom',
			'wherein',
			'whereon',
			'wheresoever',
			'whereto',
			'wheretofore',
			'whereupon',
			'wherever',
			'wherewith',
			'whether',
			'which',
			'whichever',
			'while',
			'whilst',
			'who',
			'whoever',
			'whomever',
			'whomsoever',
			'whosoever',
			'whom',
			'whomsoever',
			'whose',
			'why',
			'wide',
			'widely',
			'will',
			'willing',
			'willingly',
			'with',
			'within',
			'without',
			'woman\'s',
			'won\'t',
			'wont',
			'would',
			'wouldn\'t',
			'wouldst', // as in "wouldst thou toketh?"
			'write',
			'writes',
			'wrote',
			'wrought',
		];
	}
	
		/* getIgnoreKeywords_allWords_X_Words()
		
			Get the common words to ignore that start with: X.
		
		*/
	
	function getIgnoreKeywords_allWords_X_Words() {
		return [
		];
	}
	
		/* getIgnoreKeywords_allWords_Y_Words()
		
			Get the common words to ignore that start with: Y.
		
		*/
	
	function getIgnoreKeywords_allWords_Y_Words() {
		return [
			'ye',
			'year\'s',
			'yee',
			'yes',
			'yet',
			'you',
			'you\'d',
			'you\'ll',
			'you\'re',
			'you\'ve',
			'your',	
			'yours',
			'yourself',
			'yourselves',
		];
	}
	
		/* getIgnoreKeywords_allWords_Z_Words()
		
			Get the common words to ignore that start with: Z.
		
		*/
	
	function getIgnoreKeywords_allWords_Z_Words() {
		return [
		];
	}
	
		/* getIgnoreKeywords_allWords_nonEnglishWords()
		
			Get the common words to ignore that start with: a non-english character.
		
		*/
	
	function getIgnoreKeywords_allWords_nonEnglishWords() {
		return [
		];
	}
});
