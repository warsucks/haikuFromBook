var fs = require('fs');

var dictionaryFile = fs.readFileSync("cmudict.txt", "utf8");

var dubliners = fs.readFileSync("books/dubliners.txt", "utf8");

var wordArray = parseDict(dictionaryFile);

var bookInLines = splitBookIntoLines(dubliners);

function writePoem(structure)
{
	var poemLines = [];
	structure.forEach(function(element)
	{
		poemLines.push(findLine(element));
	});
	var finalPoem = poemLines.join("\n");
	return finalPoem;
}

function findLine(desiredSyllables)
{
	var found = false;

	while(!found)
	{
		var lineNum = Math.floor(Math.random()*bookInLines.length);
		var line = parsePhrase(bookInLines[lineNum]);

		var startIndex = Math.floor(Math.random()*5);
		var index = startIndex;
		var syllablesSoFar = 0;

		while(!found && index < line.words.length)
		{
			syllablesSoFar +=line.syllables[index];
			if(syllablesSoFar===desiredSyllables)
			{
				found = true;
				var goodLine = line.words.slice(startIndex,index+1).join(" ");
				return goodLine;
			}
			else
			{
				index ++;
			}
		}
	}
}

function parsePhrase(phraseStr)
{
	phraseStr = phraseStr.toUpperCase();
	phraseStr = phraseStr.replace(/[\r\n\t]/g, " ");
	phraseStr = phraseStr.replace(/ {2,99}/," ");
	phraseStr = phraseStr.replace(/[^\w\s-\']/g,"")
	phraseStr = phraseStr.trim();
	phraseSplit = phraseStr.split(" ");

	var syllablesSplit = phraseSplit.map(function(word)
	{
		var cleanWord = word.replace(/[^\w\s-]/g,"");
		var found = false;
		var i = 0;
		while(!found && i<wordArray.length)
		{
			if(wordArray[i].word===cleanWord.toUpperCase())
			{
				found = true;
			}
			else
			{
				i++;
			}
		}
		if(found)
		{
			return countSyllables(wordArray[i]);
		}
		else
		{
			//console.log(cleanWord.toUpperCase()+" not found");
			return 999;
		}
	});

	var output = 
	{
		words: phraseSplit,
		syllables: syllablesSplit
	}
	return output;
}


function splitBookIntoLines(wholeBook)
{
	wholeBook = wholeBook.replace(/[\n\r]/g, ' ');
	var bookInLines = wholeBook.split(".");
	return bookInLines;
}

function parseBook(bookText)
{
	bookText = bookText.replace(/[\n\r]/g, ' ');
	var bookPhrases = bookText.split(".");
	parsePhrase(bookPhrases[56]);
}

function parseDict(dictFile)
{
	var wordArray = dictFile.split("\n");
	wordArray.forEach(function(listing, index)
	{
		var listingPieces = listing.split(" ");
		if(listingPieces[0].match(/(\d)/))
		{
			wordArray.splice(index, 1);
		}
	});

	wordObjArray = wordArray.map(function(listing)
	{
		var listingPieces = listing.split(" ");
		var wordObj = 
		{
			word: listingPieces[0],
			pronunciation: listingPieces.slice(2),
		}
		return wordObj;
	});

	return wordObjArray;
}

function countSyllables(wordListing)
{	
 	var pronunciation = wordListing.pronunciation;
 	var syllables = 0;

 	pronunciation.forEach(function(element)
 	{
 		if(element.match(/^(\D*\d)$/))
 		{
 			syllables++;
 		}
 	});
 	//console.log(wordListing.word+" has :"+syllables);
 	return syllables;
}

module.exports.writePoem = writePoem;