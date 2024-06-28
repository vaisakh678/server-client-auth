import React, { useState } from "react";
import { FormikHelpers, useFormik } from "formik";
import { toFormikValidationSchema } from "zod-formik-adapter";
import { registerSchemaType, registerSchema } from "@repo/common/config";
import { Button, Checkbox, FormControlLabel, Paper, Stack, TextField, Typography } from "@mui/material";
import useHttpPublic from "../hooks/useHttpPublic";
import { useNavigate } from "react-router-dom";
import IResponseType from "@repo/interfaces/responseType";

const Signup: React.FC = () => {
	const httpPublic = useHttpPublic();
	const navigate = useNavigate();

	const [error, setError] = useState("");

	const handleSignup = async (value: registerSchemaType, { setSubmitting }: FormikHelpers<registerSchemaType>) => {
		try {
			setError("");
			const res = (await httpPublic.post("/auth/register", value, { withCredentials: true })).data as IResponseType<registerSchemaType>;
			if (res.status) {
				navigate("/");
			} else {
				setError(res.message?.error ?? "Something went wrong!.");
			}
		} catch (error) {
			console.log(error);
			setError("Something went wrong!.");
		} finally {
			setSubmitting(true);
		}
	};

	const formik = useFormik({
		initialValues: {
			fullName: "",
			email: "",
			password: "",
			confirmPassword: "",
		},
		validationSchema: toFormikValidationSchema(registerSchema),
		onSubmit: handleSignup,
	});

	const { handleBlur, handleChange, errors, touched, isSubmitting } = formik;

	return (
		<div className="min-h-dvh w-screen flex justify-center items-center">
			<Paper sx={{ maxWidth: 320, width: "100%", p: 2, py: 3 }} variant="outlined">
				<Typography variant="h4" sx={{ mb: 5 }}>
					Signup
				</Typography>
				<Stack spacing={2}>
					<TextField
						size="small"
						label="FullName"
						name="fullName"
						onChange={handleChange}
						onBlur={handleBlur}
						error={!!(touched.fullName && errors.fullName)}
						helperText={touched.fullName && errors.fullName}
					/>
					<TextField
						size="small"
						label="Email"
						name="email"
						onChange={handleChange}
						onBlur={handleBlur}
						error={!!(touched.email && errors.email)}
						helperText={touched.email && errors.email}
					/>
					<TextField
						size="small"
						label="Password"
						type="password"
						name="password"
						onChange={handleChange}
						onBlur={handleBlur}
						error={!!(touched.password && errors.password)}
						helperText={touched.password && errors.password}
					/>
					<TextField
						size="small"
						label="Conform password"
						type="password"
						name="confirmPassword"
						onChange={handleChange}
						onBlur={handleBlur}
						error={!!(touched.confirmPassword && errors.confirmPassword)}
						helperText={touched.confirmPassword && errors.confirmPassword}
					/>
					<Stack>
						<FormControlLabel sx={{ mt: -1, mb: -1 }} control={<Checkbox defaultChecked />} label="remember me" />
					</Stack>
					<Button variant="contained" disabled={isSubmitting} onClick={() => formik.handleSubmit()} disableElevation>
						Submit
					</Button>
					<Typography color={"error"} fontSize={"14px"} textAlign={"center"}>
						{error}
					</Typography>
				</Stack>
			</Paper>
		</div>
	);
};

export default Signup;

