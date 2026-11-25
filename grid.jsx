export default function Grid() {
    return (
        <>
            <h1>Demo part</h1>
            <div className="container">
                <div className="row row-cols-3 justify-content-around" >
                    <div className="col">
                        <p>This is the first column.</p>
                    </div>
                    <div className="col">
                        <p>This is the second column.</p>
                    </div>
                    <div className="col">
                        <p>This is the third    column.</p>
                    </div>
                    <div className="col">
                        <p>This is the second column.</p>
                    </div>
                    <div className="col">
                        <p>This is the second column.</p>
                    </div>
                </div>
                <br></br>
                <br></br>
                <div className="row row-cols-2 row-cols-lg-3">
                    <div className="col">Column</div>
                    <div className="col">Column</div>
                    <div className="col">Column</div>
                    <div className="col">Column</div>
                    <div className="col">Column</div>
                    <div className="col">Column</div>
                    <div className="col-4 col-lg-2">Column</div>
                    <div className="col-4 col-lg-2">Column</div>
                    <div className="col-4 col-lg-2">Column</div>
                    <div className="col-4 col-lg-2">Column</div>
                    <div className="col-4 col-lg-2">Column</div>
                    <div className="col-4 col-lg-2">Column</div>
                </div>
            </div>
        </>
    );
}