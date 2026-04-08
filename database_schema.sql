-- Hospital Management System (HMS) - MySQL Database Schema
-- This schema represents the data model used in the HMS application.

-- ==========================================
-- 1. Core Configuration & Lookup Tables
-- ==========================================

CREATE TABLE tenants (
    id VARCHAR(50) PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    location VARCHAR(255),
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE departments (
    id VARCHAR(50) PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    head_id VARCHAR(50), -- Foreign key added later to avoid circular dependency
    description TEXT,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE roles (
    id VARCHAR(50) PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    is_active BOOLEAN DEFAULT TRUE
);

CREATE TABLE qualifications (
    id VARCHAR(50) PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    is_active BOOLEAN DEFAULT TRUE
);

CREATE TABLE availabilities (
    id VARCHAR(50) PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    description TEXT,
    is_active BOOLEAN DEFAULT TRUE
);

CREATE TABLE shifts (
    id VARCHAR(50) PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    is_active BOOLEAN DEFAULT TRUE
);

-- Mapping table for the days a base shift applies to (if needed globally)
CREATE TABLE shift_days (
    shift_id VARCHAR(50) NOT NULL,
    day_of_week ENUM('Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday') NOT NULL,
    PRIMARY KEY (shift_id, day_of_week),
    FOREIGN KEY (shift_id) REFERENCES shifts(id) ON DELETE CASCADE
);


-- ==========================================
-- 2. Staff & Personnel Tables
-- ==========================================

CREATE TABLE staff (
    id VARCHAR(50) PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    role_id VARCHAR(50) NOT NULL,
    department_id VARCHAR(50) NOT NULL,
    phone VARCHAR(50),
    status ENUM('admitted', 'scheduled') DEFAULT 'admitted',
    opd_window VARCHAR(50), -- e.g., '15 min'
    tenant_id VARCHAR(50) NOT NULL,
    availability_id VARCHAR(50) NOT NULL,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (role_id) REFERENCES roles(id),
    FOREIGN KEY (department_id) REFERENCES departments(id),
    FOREIGN KEY (tenant_id) REFERENCES tenants(id),
    FOREIGN KEY (availability_id) REFERENCES availabilities(id)
);

-- Add foreign key for department head now that staff table exists
ALTER TABLE departments
ADD FOREIGN KEY (head_id) REFERENCES staff(id) ON DELETE SET NULL;

-- Staff Qualifications (Many-to-Many)
CREATE TABLE staff_qualifications (
    staff_id VARCHAR(50) NOT NULL,
    qualification_id VARCHAR(50) NOT NULL,
    PRIMARY KEY (staff_id, qualification_id),
    FOREIGN KEY (staff_id) REFERENCES staff(id) ON DELETE CASCADE,
    FOREIGN KEY (qualification_id) REFERENCES qualifications(id) ON DELETE CASCADE
);

-- Staff Specializations (Assuming simple string tags for now, can be normalized to a specializations table)
CREATE TABLE staff_specializations (
    staff_id VARCHAR(50) NOT NULL,
    specialization_name VARCHAR(255) NOT NULL,
    PRIMARY KEY (staff_id, specialization_name),
    FOREIGN KEY (staff_id) REFERENCES staff(id) ON DELETE CASCADE
);

-- Staff Shift Assignments (CRUD operations for assigned shifts)
CREATE TABLE staff_shift_assignments (
    id VARCHAR(50) PRIMARY KEY,
    staff_id VARCHAR(50) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (staff_id) REFERENCES staff(id) ON DELETE CASCADE
);

-- Days linked to a specific staff shift assignment
CREATE TABLE staff_shift_assignment_days (
    assignment_id VARCHAR(50) NOT NULL,
    day_of_week ENUM('Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday') NOT NULL,
    PRIMARY KEY (assignment_id, day_of_week),
    FOREIGN KEY (assignment_id) REFERENCES staff_shift_assignments(id) ON DELETE CASCADE
);

-- Shifts linked to a specific staff shift assignment
CREATE TABLE staff_shift_assignment_shifts (
    assignment_id VARCHAR(50) NOT NULL,
    shift_id VARCHAR(50) NOT NULL,
    PRIMARY KEY (assignment_id, shift_id),
    FOREIGN KEY (assignment_id) REFERENCES staff_shift_assignments(id) ON DELETE CASCADE,
    FOREIGN KEY (shift_id) REFERENCES shifts(id) ON DELETE CASCADE
);


-- ==========================================
-- 3. Patient & Clinical Tables
-- ==========================================

CREATE TABLE patients (
    id VARCHAR(50) PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    age INT,
    gender VARCHAR(20),
    ward VARCHAR(100),
    doctor_id VARCHAR(50),
    diagnosis TEXT,
    blood_group VARCHAR(10),
    status ENUM('admitted', 'critical', 'stable', 'discharged', 'scheduled') DEFAULT 'stable',
    admission_date DATETIME,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (doctor_id) REFERENCES staff(id) ON DELETE SET NULL
);

CREATE TABLE appointments (
    id VARCHAR(50) PRIMARY KEY,
    appointment_time DATETIME NOT NULL,
    patient_id VARCHAR(50) NOT NULL,
    doctor_id VARCHAR(50) NOT NULL,
    type VARCHAR(100),
    department_id VARCHAR(50) NOT NULL,
    status ENUM('admitted', 'stable', 'scheduled') DEFAULT 'scheduled',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (patient_id) REFERENCES patients(id) ON DELETE CASCADE,
    FOREIGN KEY (doctor_id) REFERENCES staff(id) ON DELETE CASCADE,
    FOREIGN KEY (department_id) REFERENCES departments(id)
);

CREATE TABLE medications (
    id VARCHAR(50) PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    category VARCHAR(100),
    quantity INT DEFAULT 0,
    max_quantity INT DEFAULT 0,
    is_low_stock BOOLEAN DEFAULT FALSE,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);


-- ==========================================
-- 4. Billing & Financial Tables
-- ==========================================

CREATE TABLE invoices (
    id VARCHAR(50) PRIMARY KEY,
    patient_id VARCHAR(50) NOT NULL,
    department_id VARCHAR(50),
    services TEXT, -- Could be normalized into an invoice_line_items table
    amount DECIMAL(10, 2) NOT NULL,
    insurance_details VARCHAR(255),
    status ENUM('paid', 'pending', 'overdue') DEFAULT 'pending',
    due_date DATE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (patient_id) REFERENCES patients(id) ON DELETE CASCADE,
    FOREIGN KEY (department_id) REFERENCES departments(id) ON DELETE SET NULL
);


-- ==========================================
-- 5. Indexes for Performance Optimization
-- ==========================================

-- Staff Indexes
CREATE INDEX idx_staff_department ON staff(department_id);
CREATE INDEX idx_staff_role ON staff(role_id);
CREATE INDEX idx_staff_tenant ON staff(tenant_id);
CREATE INDEX idx_staff_name ON staff(name);

-- Patient Indexes
CREATE INDEX idx_patients_doctor ON patients(doctor_id);
CREATE INDEX idx_patients_name ON patients(name);
CREATE INDEX idx_patients_status ON patients(status);

-- Appointment Indexes
CREATE INDEX idx_appointments_time ON appointments(appointment_time);
CREATE INDEX idx_appointments_doctor ON appointments(doctor_id);
CREATE INDEX idx_appointments_patient ON appointments(patient_id);

-- Invoice Indexes
CREATE INDEX idx_invoices_patient ON invoices(patient_id);
CREATE INDEX idx_invoices_status ON invoices(status);
CREATE INDEX idx_invoices_due_date ON invoices(due_date);

-- Medication Indexes
CREATE INDEX idx_medications_category ON medications(category);
CREATE INDEX idx_medications_low_stock ON medications(is_low_stock);
