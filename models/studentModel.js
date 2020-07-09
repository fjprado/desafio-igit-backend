export default (mongoose) => {
    const studentSchema = mongoose.Schema({
        name: {
            type: String,
            required: true,
        },
        subject: {
            type: String,
            required: true,
        },
        type: {
            type: String,
            required: true,
        },
        value: {
            type: Number,
            required: true,
            validate(value) {
                if (value < 0)
                    throw new Error("Valor negativo para a nota não permitido");
            },
        },
        lastModified: {
            type: Date,
            default: Date.now,
        },
    });

    const Student = mongoose.model("student", studentSchema, "student");

    return Student;
};
