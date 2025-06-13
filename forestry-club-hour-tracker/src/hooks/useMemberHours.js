import { useState, useEffect } from "react";
import { BASE_URL } from "./../projectVariables";

function useMemberHours(user) {
    const [memberHours, setMemberHours] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`${BASE_URL}/api/hours.php?user_id=${user.user_id}`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json"
                    }
                });
                const hours = await response.json();
                setMemberHours(hours ?? []);
            } catch (err) {
                console.error("Failed to load member hours:", err);
                setError(err);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [user]);

    return { memberHours, loading, error };
}

export default useMemberHours;