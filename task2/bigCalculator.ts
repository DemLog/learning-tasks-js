export function calculateSum(firstNum: string, secondNum: string): string {
    let digits: Array<number> = [];
    const maxLength = Math.max(firstNum.length, secondNum.length);
    let tempDigit: number = 0;

    for (let i = 0; i < maxLength; i++) {
        let a = !isNaN(Number(firstNum[firstNum.length - 1 - i])) ? Number(firstNum[firstNum.length - 1 - i]) : 0;
        let b = !isNaN(Number(secondNum[secondNum.length - 1 - i])) ? Number(secondNum[secondNum.length - 1 - i]) : 0;
        let sum = a + b + tempDigit;
        if (sum > 10) {
            sum -= 10;
            tempDigit = 1;
        } else {
            tempDigit = 0;
        }
        digits.push(sum);
    }

    if (tempDigit > 0) {
        digits.push(tempDigit);
    }

    return digits.reverse().join('');
}

export function calculateMinus(firstNum: string, secondNum: string): string {
    let digits: Array<string> = [];
    let numberSign: string = "";

    let maxLength: number = firstNum.length;
    let minNum: string = secondNum;
    let maxNum: string = firstNum;

    if (firstNum.length === secondNum.length) {
        if (firstNum === secondNum) {
            return "0";
        }
        if (firstNum < secondNum) {
            maxNum = secondNum;
            minNum = firstNum;
            numberSign = "-";
        }
        maxLength = firstNum.length;
    } else if (firstNum.length < secondNum.length) {
        maxNum = secondNum;
        minNum = firstNum;
        numberSign = "-";
        maxLength = secondNum.length;
    }

    let tempDigit: number = 0;
    for (let i = 0; i < maxLength; i++) {
        let a = !isNaN(Number(maxNum[maxNum.length - 1 - i])) ? Number(maxNum[maxNum.length - 1 - i]) : 0;
        let b = !isNaN(Number(minNum[minNum.length - 1 - i])) ? Number(minNum[minNum.length - 1 - i]) : 0;
        let sum = a - b - tempDigit;
        if (sum < 0) {
            sum += 10;
            tempDigit = 1;
        } else {
            tempDigit = 0;
        }
        digits.push(String(sum));
    }

    digits.push(numberSign);
    return digits.reverse().join('');
}

export function calculateMulti(firstNum: string, secondNum: string): string {
    let digits: Array<number> = [];
    let tempDigit: number = 0;
    let numberSign: string = "";

    if (firstNum === "0" || secondNum === "0") {
        return "0";
    }

    if (firstNum.startsWith("-") !== secondNum.startsWith("-")) {
        numberSign = "-";
        if (firstNum.startsWith("-")) {
            firstNum = firstNum.slice(1);
        } else {
            secondNum = secondNum.slice(1);
        }
    }

    for (let i = 0; i < firstNum.length; i++) {
        let a = !isNaN(Number(firstNum[firstNum.length - 1 - i])) ? Number(firstNum[firstNum.length - 1 - i]) : 0;
        for (let j = 0; j < secondNum.length; j++) {
            let b = !isNaN(Number(secondNum[secondNum.length - 1 - j])) ? Number(secondNum[secondNum.length - 1 - j]) : 0;
            let operation = a * b + tempDigit;
            if (operation < 10) {
                tempDigit = 0;
            } else {
                tempDigit = ~~(operation / 10);
                operation %= 10;
            }

            let currentValue = (digits[i + j] ?? 0) + operation;
            if (currentValue > 10) {
                digits[i + j] = currentValue % 10;
                tempDigit += ~~(currentValue / 10);
            } else {
                digits[i + j] = currentValue;
            }
        }

        if (tempDigit > 0) {
            let currentValue = (digits[i + secondNum.length] ?? 0) + tempDigit;
            if (currentValue > 10) {
                digits[i + secondNum.length] = currentValue % 10;
                digits[i + secondNum.length + 1] = ~~(currentValue / 10);
            } else {
                digits[i + secondNum.length] = currentValue;
            }
        }
        tempDigit = 0;
    }

    return numberSign + digits.reverse().join('');
}

function compareStrings(str1: string, str2: string): boolean {
    if (str1.length > str2.length || str1 === str2) {
        return true;
    }
    return str1.length === str2.length && str1 > str2;

}

export function calculateDiv(firstNum: string, secondNum: string): string {
    let digits: Array<number> = [];
    let tempDigit: string = "";
    let numberSign: string = "";

    if (firstNum === "0" || firstNum.length < secondNum.length) {
        return "0";
    }
    if (secondNum === "0") {
        throw "Деление на ноль запрещено!";
    }
    if (firstNum === secondNum) {
        return "1";
    }
    if (firstNum.startsWith("-") !== secondNum.startsWith("-")) {
        numberSign = "-";
    }

    tempDigit = firstNum.slice(0, secondNum.length);
    for (let i = secondNum.length - 1; i < firstNum.length; i++) {
        tempDigit += i == secondNum.length - 1 ? "" : firstNum[i];
        let tempQuotient = 0;

        let multi = calculateMulti(secondNum, String(tempQuotient));
        do {
            tempQuotient++;
            multi = calculateMulti(secondNum, String(tempQuotient));
        } while (compareStrings(tempDigit, multi));
        tempQuotient--;
        if (tempQuotient === -1) {
            digits.push(0);
            continue;
        }
        digits.push(tempQuotient);
        tempDigit = String(+calculateMinus(tempDigit, calculateMulti(secondNum, String(tempQuotient))) || "");
    }

    return numberSign + Number(digits.join('')).toString();
}