import { RegisterForm } from "../components/RegisterForm";

export const StudentRegisterPage = () => {

  return (
    <div className=' container max-w-md p-4 rounded-md card-shadow mt-[5rem]'>
      <RegisterForm role="student" />
    </div>
  );
};
