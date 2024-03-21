import { gql } from "@apollo/client";

const CALIFICATIONS_BY_STUDENT = gql`
  query Student {
    getCalificationByGrade {
      name
      lastName
      rol
      grade {
        id
        fullName
        headerTeacher
      }
      subjects {
        name
      }
      califications {
        id
        value
        name
      }
    }
  }
`;

export {CALIFICATIONS_BY_STUDENT}
