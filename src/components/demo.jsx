
export default function Alert(props) {
    const object = props.props;

    if (!object.show) {
        return null;
    }

    return (
        <div className={`alert alert-${object.type} alert-dismissible fade show`} role="alert">
            <strong>{object.type}</strong>: {object.msg}
        </div>
    );
}