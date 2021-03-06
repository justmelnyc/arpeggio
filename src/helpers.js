// Notes: frets()
// --------------
// Returns an array of total frets allowed for the diagram to cycle through.

export function frets() {
  return [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
}


// Notes: chromatic()
// ------------------
// Returns a chromatic scale using either sharps or flats depending on the
// value passed to the first parameter.

export function chromatic(sharps = true) {
  if ( sharps ) {
    return ['A', 'A♯', 'B', 'C', 'C♯', 'D', 'D♯', 'E', 'F', 'F♯', 'G', 'G♯'];
  } else {
    return ['A', 'B♭', 'B', 'C', 'D♭', 'D', 'E♭', 'E', 'F', 'G♭', 'G', 'A♭'];
  }
}


// Notes: cleanAccidental()
// ------------------------
// Used to switch the value of like sharp/flat notes when changing the app's
// state to use sharps vs. flats.

export function cleanAccidental(note) {
  switch (note) {
    case 'A♯' : note = 'B♭'; break;
    case 'B♭' : note = 'A♯'; break;
    case 'C♯' : note = 'D♭'; break;
    case 'D♭' : note = 'C♯'; break;
    case 'D♯' : note = 'E♭'; break;
    case 'E♭' : note = 'D♯'; break;
    case 'F♯' : note = 'G♭'; break;
    case 'G♭' : note = 'F♯'; break;
    case 'G♯' : note = 'A♭'; break;
    case 'A♭' : note = 'G♯'; break;
    default   : return note;
  }
  return note;
}


// Notes: getNotesFromFormula()
// ----------------------------
// Returns an array of note values (e.g. ['A', 'C♯', 'E']) from a chord's 
// formula in chordData() (e.g. [0, 4, 7]).

export function getNotesFromFormula(rootNote, formula, sharps = true) {
  let theNotes = [];
  formula.forEach(function(chordInterval) {
    theNotes.push(arrNextInt(chromatic(sharps), rootNote, chordInterval));
  });
  return theNotes;
}


// Notes: arrPrevInt() and arrNextInt()
// ------------------------------------
// 01. If iPrev is <= -1, we have gone past the beginning of the array and we
//     loop back around. Otherwise, get prev.
// 02. If iNext is >= to the length of our array, we are at the end of the
//     array and we loop back around. Otherwise, get next.

export function arrPrevInt(arr, val, int) {
  let iPrev = ( isNaN(val) ) ? arr.indexOf(val) - parseInt(int, 10) : arr.indexOf(parseInt(val, 10)) - parseInt(int, 10);
  return ( iPrev <= -1 ) ? arr[Math.abs(arr.length - int)] : arr[iPrev]; // 01
}

export function arrNextInt(arr, val, int) {
  let iNext = ( isNaN(val) ) ? arr.indexOf(val) + parseInt(int, 10) : arr.indexOf(parseInt(val, 10)) + parseInt(int, 10);
  return ( iNext >= arr.length ) ? arr[iNext % arr.length] : arr[iNext]; // 02
}


// Notes: chordData()
// ------------------
// Master list of all chord information. The chart below illustrates the
// relationship between a chord's interval formula (e.g. 1, ♭3, 5) and its
// array notation formula (e.g. [0, 3, 7]).
//
// formulaOptInt references optional intervals in the original formula, whereas
// formulaOptInd references optional indicies in the original formula array.
//
// =============================================================================
// Int | 1   | ♭2  | 2   | ♭3  | 3   | 4   | ♭5  | 5   | ♯5  | 6   | ♭7  | 7   |
//     | 8   | ♭9  | 9   | ♯9  | --- | 11  | ♯11 | --- | ♭13 | 13  | ♯13 | --- |
// -----------------------------------------------------------------------------
// Arr | 0   | 1   | 2   | 3   | 4   | 5   | 6   | 7   | 8   | 9   | 10  | 11  |
// =============================================================================

export function chordData() {
  return [
    {
      name          : 'Major',
      symbol        : '',
      formula       : [0, 4, 7],
      formulaOptInt : [],
      formulaOptInd : [],
      formulaSymbol : ['1', '3', '5'],
    },
    {
      name          : 'Minor',
      symbol        : 'm',
      formula       : [0, 3, 7],
      formulaOptInt : [],
      formulaOptInd : [],
      formulaSymbol : ['1', '♭3', '5'],
    },
    {
      name          : 'Diminished',
      symbol        : 'dim',
      formula       : [0, 3, 6],
      formulaOptInt : [],
      formulaOptInd : [],
      formulaSymbol : ['1', '♭3', '♭5'],
    },
    {
      name          : 'Augmented',
      symbol        : 'aug',
      formula       : [0, 4, 8],
      formulaOptInt : [],
      formulaOptInd : [],
      formulaSymbol : ['1', '3', '♯5'],
    },
    {
      name          : 'Suspended 2nd',
      symbol        : 'sus2',
      formula       : [0, 2, 7],
      formulaOptInt : [],
      formulaOptInd : [],
      formulaSymbol : ['1', '2', '5'],
    },
    {
      name          : 'Suspended 4th',
      symbol        : 'sus4',
      formula       : [0, 5, 7],
      formulaOptInt : [],
      formulaOptInd : [],
      formulaSymbol : ['1', '4', '5'],
    },
    {
      name          : 'Major 7th',
      symbol        : 'maj7',
      formula       : [0, 4, 7, 11],
      formulaOptInt : [7],
      formulaOptInd : [2],
      formulaSymbol : ['1', '3', '5', '7'],
    },
    {
      name          : 'Major 7th Sharp 11',
      symbol        : 'maj7♯11',
      formula       : [0, 4, 6, 7, 11],
      formulaOptInt : [7],
      formulaOptInd : [3],
      formulaSymbol : ['1', '3', '5', '7', '♯11'],
    },
    {
      name          : 'Minor Major 7th',
      symbol        : 'm(maj7)',
      formula       : [0, 3, 7, 11],
      formulaOptInt : [7],
      formulaOptInd : [2],
      formulaSymbol : ['1', '♭3', '5', '7'],
    },
    {
      name          : 'Augmented Major 7th',
      symbol        : 'aug(maj7)',
      formula       : [0, 4, 8, 11],
      formulaOptInt : [],
      formulaOptInd : [],
      formulaSymbol : ['1', '3', '♯5', '7'],
    },
    {
      name          : 'Dominant 7th',
      symbol        : '7',
      formula       : [0, 4, 7, 10],
      formulaOptInt : [7],
      formulaOptInd : [2],
      formulaSymbol : ['1', '3', '5', '♭7'],
    },
    {
      name          : 'Augmented 7th',
      symbol        : 'aug7',
      formula       : [0, 4, 8, 10],
      formulaOptInt : [],
      formulaOptInd : [],
      formulaSymbol : ['1', '3', '♯5', '♭7'],
    },
    {
      name          : 'Minor 7th',
      symbol        : 'm7',
      formula       : [0, 3, 7, 10],
      formulaOptInt : [7],
      formulaOptInd : [2],
      formulaSymbol : ['1', '♭3', '5', '♭7'],
    },
    {
      name          : 'Half Diminished 7th',
      symbol        : 'm7♭5',
      formula       : [0, 3, 6, 10],
      formulaOptInt : [],
      formulaOptInd : [],
      formulaSymbol : ['1', '♭3', '♭5', '♭7'],
    },
    {
      name          : 'Full Diminished 7th',
      symbol        : 'dim7',
      formula       : [0, 3, 6, 9],
      formulaOptInt : [],
      formulaOptInd : [],
      formulaSymbol : ['1', '♭3', '♭5', '6'],
    },
    {
      name          : '7th Suspended 2nd',
      symbol        : '7sus2',
      formula       : [0, 2, 7, 10],
      formulaOptInt : [],
      formulaOptInd : [],
      formulaSymbol : ['1', '2', '5', '♭7'],
    },
    {
      name          : '7th Suspended 4th',
      symbol        : '7sus4',
      formula       : [0, 5, 7, 10],
      formulaOptInt : [],
      formulaOptInd : [],
      formulaSymbol : ['1', '4', '5', '♭7'],
    },
    {
      name          : 'Major 9th',
      symbol        : 'maj9',
      formula       : [0, 2, 4, 7, 11],
      formulaOptInt : [7],
      formulaOptInd : [3],
      formulaSymbol : ['1', '3', '5', '7', '9'],
    },
    {
      name          : 'Minor Major 9th',
      symbol        : 'm(maj9)',
      formula       : [0, 2, 3, 7, 11],
      formulaOptInt : [7],
      formulaOptInd : [3],
      formulaSymbol : ['1', '♭3', '5', '7', '9'],
    },
    {
      name          : 'Augmented Major 9th',
      symbol        : 'aug(maj9)',
      formula       : [0, 2, 4, 8, 11],
      formulaOptInt : [],
      formulaOptInd : [],
      formulaSymbol : ['1', '3', '♯5', '7', '9'],
    },
    {
      name          : 'Dominant 9th',
      symbol        : '9',
      formula       : [0, 2, 4, 7, 10],
      formulaOptInt : [7],
      formulaOptInd : [3],
      formulaSymbol : ['1', '3', '5', '♭7', '9'],
    },
    {
      name          : 'Minor 9th',
      symbol        : 'm9',
      formula       : [0, 2, 3, 7, 10],
      formulaOptInt : [7],
      formulaOptInd : [3],
      formulaSymbol : ['1', '♭3', '5', '♭7', '9'],
    },
    {
      name          : 'Augmented 9th',
      symbol        : 'aug9',
      formula       : [0, 2, 4, 8, 10],
      formulaOptInt : [],
      formulaOptInd : [],
      formulaSymbol : ['1', '3', '♯5', '♭7', '9'],
    },
    {
      name          : 'Major 11th',
      symbol        : 'maj11',
      formula       : [0, 2, 4, 5, 7, 11],
      formulaOptInt : [2, 7],
      formulaOptInd : [1, 4],
      formulaSymbol : ['1', '3', '5', '7', '9', '11'],
    },
    {
      name          : 'Minor Major 11th',
      symbol        : 'm(maj11)',
      formula       : [0, 2, 3, 5, 7, 11],
      formulaOptInt : [2, 7],
      formulaOptInd : [1, 4],
      formulaSymbol : ['1', '♭3', '5', '7', '9', '11'],
    },
    {
      name          : 'Augmented Major 11th',
      symbol        : 'aug(maj11)',
      formula       : [0, 2, 4, 5, 8, 11],
      formulaOptInt : [2],
      formulaOptInd : [1],
      formulaSymbol : ['1', '3', '♯5', '7', '9', '11'],
    },
    {
      name          : 'Dominant 11th',
      symbol        : '11',
      formula       : [0, 2, 4, 5, 7, 10],
      formulaOptInt : [2, 7],
      formulaOptInd : [1, 4],
      formulaSymbol : ['1', '3', '5', '♭7', '9', '11'],
    },
    {
      name          : 'Minor 11th',
      symbol        : 'm11',
      formula       : [0, 2, 3, 5, 7, 10],
      formulaOptInt : [2, 7],
      formulaOptInd : [1, 4],
      formulaSymbol : ['1', '♭3', '5', '♭7', '9', '11'],
    },
    {
      name          : 'Augmented 11th',
      symbol        : 'aug11',
      formula       : [0, 2, 4, 5, 8, 10],
      formulaOptInt : [2],
      formulaOptInd : [1],
      formulaSymbol : ['1', '3', '♯5', '♭7', '9', '11'],
    },
    {
      name          : 'Major 13th',
      symbol        : 'maj13',
      formula       : [0, 2, 4, 5, 7, 9, 11],
      formulaOptInt : [2, 5, 7],
      formulaOptInd : [1, 3, 4],
      formulaSymbol : ['1', '3', '5', '7', '9', '11', '13'],
    },
    {
      name          : 'Minor Major 13th',
      symbol        : 'm(maj13)',
      formula       : [0, 2, 3, 5, 7, 9, 11],
      formulaOptInt : [2, 5, 7],
      formulaOptInd : [1, 3, 4],
      formulaSymbol : ['1', '♭3', '5', '7', '9', '11', '13'],
    },
    {
      name          : 'Augmented Major 13th',
      symbol        : 'aug(maj13)',
      formula       : [0, 2, 4, 5, 8, 9, 11],
      formulaOptInt : [2, 5],
      formulaOptInd : [1, 3],
      formulaSymbol : ['1', '3', '♯5', '7', '9', '11', '13'],
    },
    {
      name          : 'Dominant 13th',
      symbol        : '13',
      formula       : [0, 2, 4, 5, 7, 9, 10],
      formulaOptInt : [2, 5, 7],
      formulaOptInd : [1, 3, 4],
      formulaSymbol : ['1', '3', '5', '♭7', '9', '11', '13'],
    },
    {
      name          : 'Minor 13th',
      symbol        : 'm13',
      formula       : [0, 2, 3, 5, 7, 9, 10],
      formulaOptInt : [2, 5, 7],
      formulaOptInd : [1, 3, 4],
      formulaSymbol : ['1', '♭3', '5', '♭7', '9', '11', '13'],
    },
    {
      name          : 'Added 2nd',
      symbol        : 'add2',
      formula       : [0, 2, 4, 7],
      formulaOptInt : [7],
      formulaOptInd : [3],
      formulaSymbol : ['1', '2', '3', '5'],
    },
    {
      name          : 'Minor Added 2nd',
      symbol        : 'm(add2)',
      formula       : [0, 2, 3, 7],
      formulaOptInt : [7],
      formulaOptInd : [3],
      formulaSymbol : ['1', '2', '♭3', '5'],
    },
    {
      name          : 'Added 4th',
      symbol        : 'add4',
      formula       : [0, 4, 5, 7],
      formulaOptInt : [7],
      formulaOptInd : [3],
      formulaSymbol : ['1', '3', '4', '5'],
    },
    {
      name          : 'Minor Added 4th',
      symbol        : 'm(add4)',
      formula       : [0, 3, 5, 7],
      formulaOptInt : [7],
      formulaOptInd : [3],
      formulaSymbol : ['1', '♭3', '4', '5'],
    },
    {
      name          : '6th',
      symbol        : '6',
      formula       : [0, 4, 7, 9],
      formulaOptInt : [7],
      formulaOptInd : [2],
      formulaSymbol : ['1', '3', '5', '6'],
    },
    {
      name          : 'Minor 6th',
      symbol        : 'm6',
      formula       : [0, 3, 7, 9],
      formulaOptInt : [7],
      formulaOptInd : [2],
      formulaSymbol : ['1', '♭3', '5', '6'],
    },
    {
      name          : 'Major 6-9',
      symbol        : '6-9',
      formula       : [0, 2, 4, 7, 9],
      formulaOptInt : [7],
      formulaOptInd : [3],
      formulaSymbol : ['1', '3', '5', '6', '9'],
    },
    {
      name          : 'Minor 6-9',
      symbol        : 'm6-9',
      formula       : [0, 2, 3, 7, 9],
      formulaOptInt : [7],
      formulaOptInd : [3],
      formulaSymbol : ['1', '♭3', '5', '6', '9'],
    },
  ];
}