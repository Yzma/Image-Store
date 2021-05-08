

export class InvalidFileTypeError extends Error {
    constructor(...params) {
        // Pass remaining arguments (including vendor specific ones) to parent constructor
        super(...params)

        // Maintains proper stack trace for where our error was thrown (only available on V8)
        if (Error.captureStackTrace) {
            Error.captureStackTrace(this, InvalidFileTypeError)
        }

        this.name = 'InvalidFileTypeError'
    }
}

export class InvalidUserError extends Error {
    constructor(errorDescription, ...params) {
        // Pass remaining arguments (including vendor specific ones) to parent constructor
        super(...params)

        // Maintains proper stack trace for where our error was thrown (only available on V8)
        if (Error.captureStackTrace) {
            Error.captureStackTrace(this, InvalidUserError)
        }

        this.name = 'InvalidUserError'
        this.errorDescription = errorDescription
    }
}