import Swal from 'sweetalert2';

function testAlert() {
    Swal.fire({
        title: 'Hello World',
        text: 'This is a test alert!',
        icon: 'info',
        confirmButtonText: 'Cool'
    });
}

function TestComponent() {
    return (
        <div>
            <button className='btn' onClick={testAlert}>Test Alert</button>
        </div>
    );
}

export default TestComponent;
