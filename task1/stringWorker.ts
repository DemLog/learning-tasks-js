const punctuationMarks: string[] = ['.', ',', '?', '!'];

export function convertLowerCase(str: string): string {
    let strResult: string = "";
    for (let i = 0; i < str.length; i++) {
        if (i === 0) {
            strResult += str[i].toUpperCase();
            continue;
        }
        strResult += str[i].toLowerCase();
    }

    return strResult;
}

export function convertWithSpace(str: string): string {
    let strResult: string = "";
    let flagSpace: boolean = false;

    for (let i = 0; i < str.length; i++) {
        if (punctuationMarks.includes(str[i])) {
            strResult += str[i];
            flagSpace = true;
            continue;
        }
        if (str[i] === " ") {
            flagSpace = true;
            continue;
        }
        strResult += flagSpace ? " " + str[i] : str[i];
        flagSpace = false;
    }

    return strResult;
}

export function getLengthWords(str: string): number {
    let lengthWords: number = 0;
    if (str.length === 0) return lengthWords;
    for (let symbol of str) {
        if (symbol === " ") {
            lengthWords++;
        }
    }
    return lengthWords + 1;
}


export function getUniqueWords(str: string): Array<{word: string, count: number}> {
    let wordsResult: Array<{word: string, count: number}> = [];
    let tempWord: string = "";

    if (str.length === 0) return wordsResult;
    for (let symbol of str.toLowerCase()) {
        if (symbol === " ") {
            let objWord = wordsResult.find((val) => val.word === tempWord);
            if (!objWord) {
                objWord = {word: tempWord, count: 0};
                wordsResult.push(objWord);
            }
            objWord.count++;
            tempWord = "";
            continue;
        } else if (punctuationMarks.includes(symbol)) {
            continue;
        }
        tempWord += symbol;
    }

    return wordsResult;
}