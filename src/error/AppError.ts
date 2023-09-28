export class AppError {
    constructor(public readonly message: string = 'Something went wrong', public readonly status: number = 400) {
        this.message = message
        this.status = status
    }
}