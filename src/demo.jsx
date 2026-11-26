export default function Demo(props) {
    const title = props.title;
    return (
        <>
            <div >
                <h1>{title || 'Default Title'}</h1>
            </div>
        </>
    );
}