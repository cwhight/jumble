import operate from "./operate";

function isNumber(item: any) {
    return !!item.match(/[0-9]+/);
}

/**
 * Given a button name and a calculator data object, return an updated
 * calculator data object.
 *
 * Calculator data object contains:
 *   total:s      the running total
 *   next:String       the next number to be operated on with the total
 *   operation:String  +, -, etc.
 */
export default function calculate(obj: any, buttonName: any) {
    if (buttonName === 'AC') {
        return {
            equals: false,
            total: 0,
            next: null,
            operation: null,
        };
    }

    if (isNumber(buttonName)) {
        // If there is an operation, update next
        if (obj.operation) {
            // return { ...obj, next: buttonName };
            return {
                equals: true,
                total: operate(obj.total, buttonName, obj.operation),
                next: null,
                operation: null,
            };
        }

        return {
            next: buttonName,
            total: null,
        };
    }


    if (buttonName === '=') {
        if (obj.next && obj.operation) {

        }
        // '=' with no operation, nothing to do
        return { ...obj };
    }

    // User pressed an operation after pressing '='
    if (!obj.next && obj.total && !obj.operation) {
        return { ...obj, operation: buttonName };
    }

    // User pressed an operation button and there is an existing operation
    if (obj.operation) {
            return { ...obj, operation: buttonName };

    }


    // The user hasn't typed a number yet
    if (!obj.next) {
        return { operation: null };
    }

    // save the operation and shift 'next' into 'total'
    return {
        equals: false,
        total: obj.next,
        next: null,
        operation: buttonName,
    };
}
