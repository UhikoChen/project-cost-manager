import axios from "axios"

export function useCompanyData() {

    // 取得所有公司資料
    async function getAllCompany() {
        let data = [];

        try {
            const res = await axios.get("https://nodejs-mysql-api-phi.vercel.app/api/company");
            data = res.data['data'];
        }
        catch(error) {
            console.log(error);
        }

        console.log(data);

        return data;
    }

    // 更新公司資料
    async function updateCompany(companyID,companyName) {

        const data = {
            name: companyName,
        }
        try{
            const res = await axios.put(`https://nodejs-mysql-api-phi.vercel.app/api/company/${companyID}`,data);
            if(res.data.status) {
                console.log(res.data.status);
            }
            else {
                console.log(res.data.data[0]);
            }
        }
        catch(error) {
            console.log(error);
        }
    }

    // 新增公司資料
    async function addCompany(companyName, ownerID) {
        const data = { 
            name: companyName,
            owner: ownerID
        }

        try {
            const res = await axios.post('https://nodejs-mysql-api-phi.vercel.app/api/company', data);
            console.log(res.data.data[1]);
        }
        
        catch(error) {
            console.log(error);
        }
    }

    // 刪除公司資料
    async function deleteCompany(companyID) {
        try {
            const res = await axios.delete(`https://nodejs-mysql-api-phi.vercel.app/api/company/${companyID}`);
            console.log(res.data.status);
        }
        catch(error) {
            console.log(error);
        }
    }

    return { getAllCompany, updateCompany, addCompany, deleteCompany }
}