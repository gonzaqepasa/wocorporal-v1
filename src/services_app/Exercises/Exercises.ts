
// import { TypesExercise } from "@/types/exercises";


// class ExerciseService {

//     async getAllExercises() {
//         try {
//             const exercises = await Exercise.find();
//             return exercises;
//         } catch (error) {
//             console.log(error);
//             throw new Error('Error fetching exercises');
//         }
//     }

//     async getExerciseById(id: string) {
//         try {
//             const exercise = await Exercise.findById(id);
//             return exercise;
//         } catch (error) {
//             console.log(error);
//             throw new Error('Error fetching exercise');
//         }
//     }

//     async createExercise(data: TypesExercise) {
//         try {
//             const newExercise = new Exercise(data);
//             await newExercise.save();
//             return newExercise;
//         } catch (error) {
//             console.log(error);

//             throw new Error('Error creating exercise');
//         }
//     }

//     async updateExercise(id: string, data: Partial<TypesExercise>) {
//         try {
//             const updatedExercise = await Exercise.findByIdAndUpdate(id, data, { new: true });
//             return updatedExercise;
//         } catch (error) {
//             console.log(error);
//             throw new Error('Error updating exercise');
//         }
//     }

//     async deleteExercise(id: string) {
//         try {
//             const deletedExercise = await Exercise.findByIdAndDelete(id);
//             return deletedExercise;
//         } catch (error) {
//             console.error(error);
//             throw new Error('Error deleting exercise');
//         }
//     }
// }

// const exerciseService = new ExerciseService();
// export default exerciseService;
