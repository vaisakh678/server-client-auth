import React, { useState } from "react";
import { FormikHelpers, useFormik } from "formik";
import { toFormikValidationSchema } from "zod-formik-adapter";
import { loginSchema, loginSchemaType } from "@repo/common/config";
import { Button, Checkbox, FormControlLabel, Paper, Stack, TextField, Typography } from "@mui/material";
import useHttpPublic from "../hooks/useHttpPublic";
import { useNavigate } from "react-router-dom";
import IResponseType from "@repo/interfaces/responseType";

const Login: React.FC = () => {
	const httpPublic = useHttpPublic();
	const navigate = useNavigate();

	const [error, setError] = useState("");

	const handleLogin = async (value: loginSchemaType, { setSubmitting }: FormikHelpers<loginSchemaType>) => {
		try {
			const res = (await httpPublic.post("/auth/login", value, { withCredentials: true })).data as IResponseType;
			if (res.status) {
				localStorage.setItem("accessToken", res.data.accessToken);
				navigate("/");
			} else {
				setError(res.message?.error ?? "Something went wrong!.");
			}
		} catch (error) {
			setError("Something went wrong!.");
		} finally {
			setSubmitting(true);
		}
	};

	const formik = useFormik({
		initialValues: {
			email: "",
			password: "",
		},
		validationSchema: toFormikValidationSchema(loginSchema),
		onSubmit: handleLogin,
	});

	const { handleBlur, handleChange, errors, touched, isSubmitting } = formik;

	return (
		<div className="min-h-dvh w-screen flex justify-center items-center">
			<Paper sx={{ maxWidth: 320, width: "100%", p: 2, py: 3 }} variant="outlined">
				<Typography variant="h4" sx={{ mb: 5 }}>
					Login
				</Typography>
				<Stack spacing={2}>
					<TextField
						size="small"
						label="email"
						name="email"
						onChange={handleChange}
						onBlur={handleBlur}
						error={!!(touched.email && errors.email)}
						helperText={touched.email && errors.email}
					/>
					<TextField
						size="small"
						label="password"
						type="password"
						name="password"
						onChange={handleChange}
						onBlur={handleBlur}
						error={!!(touched.password && errors.password)}
						helperText={touched.password && errors.password}
					/>
					<Stack>
						<FormControlLabel sx={{ mt: -1, mb: -1 }} control={<Checkbox defaultChecked />} label="remember me" />
					</Stack>
					<Button variant="contained" disabled={isSubmitting} onClick={() => formik.handleSubmit()} disableElevation>
						Login
					</Button>
					<Typography color={"error"} fontSize={"14px"} textAlign={"center"}>
						{error}
					</Typography>
				</Stack>
			</Paper>
		</div>
	);
};

export default Login;

