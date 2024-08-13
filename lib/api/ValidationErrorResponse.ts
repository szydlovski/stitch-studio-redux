import {NextResponse} from "next/server";
import {ZodError} from "zod";

export class ValidationErrorResponse {
    static json(error: ZodError) {
        return NextResponse.json({
            error: true,
            message: error.message,
            errors: error.errors
        }, {
            status: 400
        });
    }
}