import { useFormik } from "formik";
import { Yup } from "yup";
import { Button } from "../../components/button/Button";

import "./Form.css";

export const Former = () => {
  const formik = useFormik({
    initialValues: {
      checked: {},
    },
    onSubmit: (values) => console.log(values),
  });
  // console.log(formik.values);
  return (
    <form onSubmit={formik.handleSubmit}>
      <div className="questions">
        <label>
          <input
            type="checkbox"
            onChange={formik.handleChange}
            value="one"
            name="checked"
          />
          one
        </label>
        <label>
          <input
            type="checkbox"
            onChange={formik.handleChange}
            value="two"
            name="checked"
          />
          two
        </label>
        <label>
          <input
            type="checkbox"
            onChange={formik.handleChange}
            value="three"
            name="checked"
          />
          three
        </label>
      </div>
      <Button kind="submit" title="Submit" />{" "}
    </form>
  );
};

/*
export const Former = () => (
 

  <Formik
    initialValues={{
      checked: [],
    }}
    onSubmit={(values) => console.log(values)}
  >
    {({ values }) => (
      <Form>
        <div className="question">
          <label>
            <Field type="checkbox" name="checked" value="one-one" />
            one
          </label>
          <label>
            <Field type="checkbox" name="checked" value="two-one" />
            two
          </label>
        </div>
        <button type="submit">submit</button>
      </Form>
    )}
  </Formik>
);
*/
