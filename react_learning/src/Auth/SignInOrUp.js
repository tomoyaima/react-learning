import React from 'react';
import { Button, Form, FormGroup, Label, Input, FormFeedback, Spinner } from 'reactstrap';
import { Link, withRouter } from 'react-router-dom'
import { Formik } from 'formik';
import * as Yup from 'yup';
import firebase,{providerFacebook} from '../Firebase/config';

class SignInOrUp extends React.Component {

    state = {
        loading: false, //spinner制御用
    }

    _isMounted = false;

    handleOnSubmit = (values) => {
        //spinner表示開始
        console.log(this.loading)
        if (this._isMounted) this.setState({ loading: true })
        //サインイン（ログイン）処理
        firebase.auth().signInWithRedirect(providerFacebook)
            .then(res => {
                //正常終了時
                this.props.history.push("/");
                if (this._isMounted) this.setState({ loading: false });
            })
            .catch(error => {
                //異常終了時
                if (this._isMounted) this.setState({ loading: false });
                alert(error);
            });

    }

    componentDidMount = () => {
        this._isMounted = true;
    }

    componentWillUnmount = () => {
        this._isMounted = false;
    }

    render() {
        return (
            <div className="container">
                <div className="mx-auto" style={{ width: 400, background: '#eee', padding: 20, marginTop: 60 }}>
                    <p style={{ textAlign: 'center' }}>サインイン</p>
                    <Formik
                        initialValues={{ email: '', password: '' }}
                        onSubmit={(values) => this.handleOnSubmit(values)}
                        validationSchema={Yup.object().shape({
                            email: Yup.string().email().required(),
                            password: Yup.string().required(),
                        })}
                    >
                        {
                            ({ handleSubmit, handleChange, handleBlur, values, errors, touched }) => (
                                
                             
                                <div style={{ textAlign: 'center' }}>
                                    <Button onClick={handleSubmit} color="primary" type="submit" disabled={this.state.loading}>
                                        <Spinner size="sm" color="light" style={{ marginRight: 5 }} hidden={!this.state.loading} />
                                        ログイン
                                    </Button>
                                </div>
                                
                            )
                        }
                    </Formik>
                </div>
                <div className="mx-auto" style={{ width: 400, background: '#fff', padding: 20 }}>
                    <Link to="/signup">新規登録はこちら。</Link>
                </div>
            </div>
        );
    }
}

export default withRouter(SignInOrUp);