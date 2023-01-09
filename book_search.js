/**
 * Searches for matches in scanned text.
 * @param {string} searchTerm - The word or term we're searching for. 
 * @param {JSON} scannedTextObj - A JSON object representing the scanned text.
 * @returns {JSON} - Search results.
 * */ 
 function findSearchTermInBooks(searchTerm, scannedTextObj) {

    // Create the output object to be returned.
    var result = {
        "SearchTerm": searchTerm,
        "Results": []
    };

    // Checks if searchTerm is empty string.
    if (!searchTerm) {
        return result;
    }

    // Checks if input object contains books.
    if (scannedTextObj.length) {
        var resultsArray = [];

        scannedTextObj.forEach(function(book) {
            let ISBN = book.ISBN;
            let content = book.Content

                for (var i = 0; i < content.length; i++) {
                    text = content[i].Text
                    if (search(searchTerm, text)) {
                        searchResult = {
                            "ISBN": ISBN,
                            "Page": content[i].Page,
                            "Line": content[i].Line
                        };
                        resultsArray.push(searchResult)
                    }
                }
        });
    
        result.Results = resultsArray;
    }
    
    return result;
}

// Search Algorithm: Create an array with words from text
// Use equality operators to find match
function search(searchTerm, text) {
    let textArray = text.split(" ");
    for (word in textArray) {
        if (textArray[word] === searchTerm) {
            return true;
        }
    }

    return false;
}

/* ===== INPUT OBJECTS ===== */
const noBooksIn = []

const bookWithNoContentIn = [
    {
        "Title": "Percy Jackson: The Lightning Thief",
        "ISBN": "9780000528531",
        "Content": [] 
    }
]

const twentyLeaguesIn = [
    {
        "Title": "Twenty Thousand Leagues Under the Sea",
        "ISBN": "9780000528531",
        "Content": [
            {
                "Page": 31,
                "Line": 8,
                "Text": "now simply went on by her own momentum.  The dark-"
            },
            {
                "Page": 31,
                "Line": 9,
                "Text": "ness was then profound; and however good the Canadian\'s"
            },
            {
                "Page": 31,
                "Line": 10,
                "Text": "eyes were, I asked myself how he had managed to see, and"
            } 
        ] 
    }
]

const harryPotterIn = [
    {
        "Title": "Harry Potter & the Half-Blood Prince",
        "ISBN": "9780545582995",
        "Content": [
            {
                "Page": 4,
                "Line": 44,
                "Text": "The green tea and avocado smoothie turned out exactly as would be expected! Can you believe that?"
            },
            {
                "Page": 5,
                "Line": 55,
                "Text": "He had a vague sense that trees gave birth to dinosaurs."
            },
            {
                "Page": 6,
                "Line": 66,
                "Text": "The detective said he wanted more detailed information. Isn't that suspicious?"
            } 
        ] 
    }
]

const greatGatsbyIn = [
    {
        "Title": "The Great Gatsby",
        "ISBN": "9780333791035",
        "Content": [
            {
                "Page": 1,
                "Line": 101,
                "Text": "Charles ate the french fries and milkshake knowing they would be his last meal."
            },
            {
                "Page": 2,
                "Line": 102,
                "Text": "My gramdma used to say: Stop waiting for exceptional things to just happen."
            },
            {
                "Page": 3,
                "Line": 103,
                "Text": "They throw cabbage that turns your brain into emotional baggage."
            } 
        ] 
    }
]

//TODO: check if appending to the same array
const multipleBooksIn = twentyLeaguesIn.concat(harryPotterIn,greatGatsbyIn);

//TODO: check if appending to the same array
const multipleBooksWithOneNoContentIn = twentyLeaguesIn.concat(harryPotterIn, bookWithNoContentIn, greatGatsbyIn);
    
/* ===== EXAMPLE OUTPUT OBJECTS ===== */
const twentyLeaguesOut = {
    "SearchTerm": "the",
    "Results": [
        {
            "ISBN": "9780000528531",
            "Page": 31,
            "Line": 9
        }
    ]
}

const noMatchesOut = {
    "SearchTerm": "",
    "Results": []
}

const noMatchesWithTheOut = {
    "SearchTerm": "the",
    "Results": []
}
const noMatchesWithSuperSearchTermOut = {
    "SearchTerm": "supercalifragilisticexpialidocious",
    "Results": []
}

const multipleBooksOut = {
    "SearchTerm": "and",
    "Results": [
        {
            "ISBN": "9780000528531",
            "Page": 31,
            "Line": 9
        },
        {
            "ISBN": "9780000528531",
            "Page": 31,
            "Line": 10
        },
        {
            "ISBN": "9780545582995",
            "Page": 4,
            "Line": 44
        },
        {
            "ISBN": "9780333791035",
            "Page": 1,
            "Line": 101,
        }
    ]
}

/*
 _   _ _   _ ___ _____   _____ _____ ____ _____ ____  
| | | | \ | |_ _|_   _| |_   _| ____/ ___|_   _/ ___| 
| | | |  \| || |  | |     | | |  _| \___ \ | | \___ \ 
| |_| | |\  || |  | |     | | | |___ ___) || |  ___) |
 \___/|_| \_|___| |_|     |_| |_____|____/ |_| |____/ 
                                                      
 */

/* We have provided two unit tests. They're really just `if` statements that 
 * output to the console. We've provided two tests as examples, and 
 * they should pass with a correct implementation of `findSearchTermInBooks`. 
 * 
 * Please add your unit tests below.
 * */

/* ===== POSITIVE TESTS ====== */

//General Case: Given a known input in one book, we get a known output.
const test1result = findSearchTermInBooks("the", twentyLeaguesIn);
if (JSON.stringify(twentyLeaguesOut) === JSON.stringify(test1result)) {
    console.log("PASS: Test 1");
} else {
    console.log("FAIL: Test 1");
    console.log("Expected:", twentyLeaguesOut);
    console.log("Received:", test1result);
}

//General Case Length Test: Given a known input in one book, we get a known output.
const test2result = findSearchTermInBooks("the", twentyLeaguesIn); 
if (test2result.Results.length == 1) {
    console.log("PASS: Test 2");
} else {
    console.log("FAIL: Test 2");
    console.log("Expected:", twentyLeaguesOut.Results.length);
    console.log("Received:", test2result.Results.length);
}

//Input Object contains multiple books with 4 matches returned
const test9result = findSearchTermInBooks("and", multipleBooksIn); 
if (JSON.stringify(multipleBooksOut) === JSON.stringify(test9result) && (test9result.Results.length == multipleBooksOut.Results.length) ) {
    console.log("PASS: Test 9");
} else {
    console.log("FAIL: Test 9");
    console.log("Expected:", multipleBooksOut, "with length ", multipleBooksOut.Results.length);
    console.log("Received:", test9result, "with length ", test9result.Results.length);
}

//Edge Case: Input Object contains multiple books with 1 book containing no content
const test7result = findSearchTermInBooks("and", multipleBooksWithOneNoContentIn); 
if (JSON.stringify(multipleBooksOut) === JSON.stringify(test7result) && (test7result.Results.length == multipleBooksOut.Results.length)) {
    console.log("PASS: Test 7");
} else {
    console.log("FAIL: Test 7");
    console.log("Expected:", multipleBooksOut, "with length ", multipleBooksOut.Results.length);
    console.log("Received:", test7result, "with length ", test9result.Results.length);
}

/* ===== NEGATIVE TESTS ====== */

//Edge Case: Search Term is an empty string
const test3result = findSearchTermInBooks("", twentyLeaguesIn); 
if (JSON.stringify(noMatchesOut) === JSON.stringify(test3result)) {
    console.log("PASS: Test 3");
} else {
    console.log("FAIL: Test 3");
    console.log("Expected:", noMatchesOut);
    console.log("Received:", test3result);
}

//No Match: Search Term is not present in books
const test4result = findSearchTermInBooks("supercalifragilisticexpialidocious", twentyLeaguesIn);
if (JSON.stringify(noMatchesWithSuperSearchTermOut) === JSON.stringify(test4result)) {
    console.log("PASS: Test 4");
} else {
    console.log("FAIL: Test 4");
    console.log("Expected:", noMatchesWithSuperSearchTermOut);
    console.log("Received:", test4result);
}

//Edge Case: Input Object contains no books
const test5result = findSearchTermInBooks("the", noBooksIn); 
if (JSON.stringify(noMatchesWithTheOut) === JSON.stringify(test5result)) {
    console.log("PASS: Test 5");
} else {
    console.log("FAIL: Test 5");
    console.log("Expected:", noMatchesWithTheOut);
    console.log("Received:", test5result);
}

//Edge Case: Input Object contains a singular book with no content
const test6result = findSearchTermInBooks("the", bookWithNoContentIn); 
if (JSON.stringify(noMatchesWithTheOut) === JSON.stringify(test6result)) {
    console.log("PASS: Test 6");
} else {
    console.log("FAIL: Test 6");
    console.log("Expected:", noMatchesWithTheOut);
    console.log("Received:", test6result);
}

/* ===== CASE-SENSITIVE TESTS ====== */
const test8result = findSearchTermInBooks("He", harryPotterIn); 
if (JSON.stringify(noMatchesWithTheOut) === JSON.stringify(test8result)) {
    console.log("PASS: Test 8");
} else {
    console.log("FAIL: Test 8");
    console.log("Expected:", noMatchesWithTheOut);
    console.log("Received:", test8result);
}
