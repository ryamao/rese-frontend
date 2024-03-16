import styled from "@emotion/styled";

const sampleOwners = [
  {
    id: 1,
    name: "Owner 1",
    email: "owner1@example.com"
  },
  {
    id: 2,
    name: "Owner 2",
    email: "owner2@example.com"
  },
  {
    id: 3,
    name: "Owner 3",
    email: "owner3@example.com"
  }
];

export function OwnerList() {
  return (
    <Table>
      <thead>
        <tr>
          <TableHeader>Name</TableHeader>
          <TableHeader>Email</TableHeader>
          <TableHeader></TableHeader>
        </tr>
      </thead>
      <tbody>
        {sampleOwners.map((owner) => (
          <DataRow key={owner.id}>
            <NameCell>{owner.name}</NameCell>
            <EmailCell>{owner.email}</EmailCell>
            <ButtonCell>
              <DeleteButton type="button">削除</DeleteButton>
            </ButtonCell>
          </DataRow>
        ))}
      </tbody>
    </Table>
  );
}

const Table = styled.table`
  width: 100%;
  color: #fff;
  border-collapse: collapse;
  background-color: #315dff;
  border-radius: 0.25rem;
  box-shadow: 0.125rem 0.125rem 0.25rem #888;
`;

const DataRow = styled.tr`
  border-top: 1px solid #1d4ed8;
`;

const TableHeader = styled.th`
  padding: 1rem;
  text-align: left;
`;

const NameCell = styled.td`
  padding: 1rem;
`;

const EmailCell = styled.td`
  padding: 1rem;
`;

const ButtonCell = styled.td`
  padding: 1rem;
  text-align: right;
`;

const DeleteButton = styled.button`
  padding: 0.375rem 1rem;
  color: #fff;
  cursor: pointer;
  background-color: #db2777;
  border: none;
  border-radius: 0.25rem;

  &:hover {
    background-color: #e11d48;
  }
`;
