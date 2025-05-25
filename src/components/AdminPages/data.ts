export interface UsersOption {
  value: string;
  label: string;
  blocking: string;
  isFixed?: boolean;
}

export var usersOption: UsersOption[] = []
export var graduateStudentsOption: UsersOption[] = []
export var scientificSupervisorsOption: UsersOption[] = []


export interface SpecialtiesOption {
  value: string;
  label: string;
  isFixed?: boolean;
}

export var specialtiesOption: SpecialtiesOption[] = []
export var educationalcoursesOption: SpecialtiesOption[] = []
export var departmentsOption: SpecialtiesOption[] = []
