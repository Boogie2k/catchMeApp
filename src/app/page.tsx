"use client";
import CatchMe from "@/assets/CatchMe";
import { adminLogin } from "@/networking/adminLogin";
/* import { superAdminLogin } from "@/networking/superAdminLogin"; */

import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";
import { useForm } from "react-hook-form";

import Loader from "@/components/Loader";
import { toast } from "react-toastify";

type FormData = {
  email: string;
  password: string;
};

const Login = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = React.useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormData>();
  const onSubmit = (data: FormData) => {
    (async () => {
      try {
        setIsLoading(true);
        const result = await adminLogin(data.email, data.password);

        if (result) {
          console.log(result);
          router.push("/dashboard/users");
        }
        setIsLoading(false);
      } catch (error) {
        toast("an error occurred try again", {
          autoClose: 5000,
        });
        setIsLoading(false);
      }
    })();
  };

  console.log(watch("password")); // watch input value by passing the name of it

  return (
    <div className="flex flex-col  items-center h-screen justify-center">
      <CatchMe />

      <p className="text-black opacity-50 mt-6">
        {" "}
        To access the CatchMeApp Dashboard
      </p>
      <h1 className="text-black text-2xl">Login to your account</h1>
      <form
        className="bg-white flex flex-col w-494 border border-slate-200 pt-10 px-6 rounded-3xl mt-6 min-h-[21.125rem]"
        onSubmit={handleSubmit(onSubmit)}
      >
        {/* register your input into the hook by invoking the "register" function */}
        <input
          className="rounded-3xl bg-lightWhite py-2.5 px-3.5  text-black"
          // defaultValue="test"
          placeholder="email"
          {...register("email", { required: true })}
        />
        {/* errors will return when field validation fails  */}
        {errors.email && (
          <span className="text-black px-6">Email is required</span>
        )}

        {/* include validation with required or other standard HTML validation rules */}
        <input
          placeholder="password"
          className="bg-lightWhite py-2.5 px-3.5 rounded-3xl my-6 text-black"
          {...register("password", { required: true })}
        />
        {/* errors will return when field validation fails  */}
        {errors.password && (
          <span className="text-black px-6">Password is required</span>
        )}

        <Link href={"#"} className="text-red-500 text-right">
          Forgot password?
        </Link>

        {/*       <input type="submit" value={"Login"} /> */}
        <button
          disabled={isLoading}
          className="bg-red-500 w-36 rounded-4xl p-2.5 mx-auto mt-6 justify-center"
        >
          {isLoading ? <Loader /> : "  Login"}
        </button>
      </form>
      <Link href={"/register"} className="text-red-500 text-center mt-6">
        Create an account
      </Link>
    </div>
  );
};

export default Login;
