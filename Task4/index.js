const axios = require("axios");

async function solve() {
    const res = await axios.get(
        "https://share.shub.edu.vn/api/intern-test/input"
    );
    const { token, data, query } = res.data;

    const n = data.length;

    // Prefix sum cho type 1
    const prefix1 = new Array(n).fill(0);
    prefix1[0] = data[0];
    for (let i = 1; i < n; i++) {
        prefix1[i] = prefix1[i - 1] + data[i];
    }

    // Prefix sum cho type 2
    const prefix2 = new Array(n).fill(0);
    prefix2[0] = data[0];
    for (let i = 1; i < n; i++) {
        prefix2[i] = prefix2[i - 1] + (i % 2 === 0 ? data[i] : -data[i]);
    }

    const results = [];

    query.forEach((q) => {
        const l = q.range[0];
        const r = q.range[1];
        if (q.type === "1") {
            results.push(l === 0 ? prefix1[r] : prefix1[r] - prefix1[l - 1]);
        } else if (q.type === "2") {
            if (l === 0) {
                results.push(prefix2[r]);
            } else if (l % 2 === 0) {
                results.push(prefix2[r] - prefix2[l - 1]);
            } else {
                results.push(-(prefix2[r] - prefix2[l - 1]));
            }
        }
    });

    try {
        const response = await axios.post(
            "https://share.shub.edu.vn/api/intern-test/output",
            results,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
            }
        );
        console.log("Server response:", response.data);
    } catch (err) {
        console.error("API error:", err.response?.data || err.message);
    }
}

solve().catch((err) => console.error(err));
