import AdminDataTable from './AdminDataTable';

const AdminAestheticData = () => {
  return (
    <AdminDataTable 
      clinicType="aesthetic"
      clinicName="Meditouch"
      brandColor="bg-meditouch-primary hover:bg-meditouch-primary-dark"
    />
  );
};

export default AdminAestheticData;