import p1 from '../banner-images/CustomerService.png';
import p2 from '../banner-images/FreeCancellation.png';
import p3 from '../banner-images/Reviews.png';

const CustomerService = () => {
    return (
        <>
            <div className="customer-service-section">
                <div className="customer-service-card">
                    <img src={p1} />
                    <div>Customer Service</div>
                </div>

                <div className="customer-service-card">
                    <img src={p2} />
                    <div>Free Cancellation</div>
                </div>

                <div className="customer-service-card">
                    <img src={p3} />
                    <div>Reviews</div>
                </div>
            </div>

        </>
    );
}

export default CustomerService;