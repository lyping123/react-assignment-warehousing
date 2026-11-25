
export default function Alert(props) {
    const object = props.props;

    return (
        <div className={`alert alert-${object.type} alert-dismissible fade show`} role="alert">
            <strong>{object.type}</strong>: {object.msg}
        </div>
    );
}