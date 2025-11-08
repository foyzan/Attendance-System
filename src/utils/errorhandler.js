
const error = (status = 500, msg = 'something went wrong') => {
    const err = new Error(msg);

    err.status = status;

    return err;
}

export default error