import { collection, getDocs, doc, getDoc, addDoc, updateDoc, deleteDoc, serverTimestamp, setDoc, query, where, orderBy } from 'firebase/firestore';
import { db } from '../firebase';

// Services Collection
export const getServices = async () => {
  try {
    console.log('Fetching services...');
    const servicesRef = collection(db, 'services');
    const snapshot = await getDocs(servicesRef);
    const services = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
    console.log('Services fetched:', services);
    return services;
  } catch (error) {
    console.error('Error fetching services:', error);
    return [];
  }
};

// Projects Collection
export const getProjects = async () => {
  try {
    const projectsCollection = collection(db, 'projects');
    const projectsSnapshot = await getDocs(projectsCollection);
    return projectsSnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
  } catch (error) {
    console.error('Error fetching projects:', error);
    return [];
  }
};

// Featured Projects Collection
export const getFeaturedProjects = async () => {
  try {
    const projectsCollection = collection(db, 'projects');
    const projectsSnapshot = await getDocs(projectsCollection);
    const allProjects = projectsSnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
    return allProjects.filter(project => project.featured);
  } catch (error) {
    console.error('Error fetching featured projects:', error);
    return [];
  }
};

// Staff Collection
export const getStaffMembers = async () => {
  try {
    console.log('Fetching staff members...');
    const staffRef = collection(db, 'staff');
    const snapshot = await getDocs(staffRef);
    const staff = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
    console.log('Staff members fetched:', staff);
    return staff;
  } catch (error) {
    console.error('Error fetching staff members:', error);
    return [];
  }
};

// Company Info Collection
export const getCompanyInfo = async () => {
  try {
    console.log('Fetching company info...');
    const companyRef = doc(db, 'company', 'info');
    const docSnap = await getDoc(companyRef);
    const data = docSnap.exists() ? docSnap.data() : null;
    console.log('Company info fetched:', data);
    return data;
  } catch (error) {
    console.error('Error fetching company info:', error);
    return null;
  }
};

// Testimonials Collection — only returns admin-approved reviews
export const getTestimonials = async () => {
  try {
    const testimonialsCollection = collection(db, 'testimonials');
    const q = query(testimonialsCollection, where('approved', '==', true));
    const testimonialsSnapshot = await getDocs(q);
    return testimonialsSnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
  } catch (error) {
    console.error('Error fetching testimonials:', error);
    return [];
  }
};

// Fetch all pending (unapproved) reviews for admin moderation
export const getPendingReviews = async () => {
  try {
    const testimonialsCollection = collection(db, 'testimonials');
    const q = query(testimonialsCollection, where('approved', '==', false));
    const snapshot = await getDocs(q);
    return snapshot.docs.map(d => ({ id: d.id, ...d.data() }));
  } catch (error) {
    console.error('Error fetching pending reviews:', error);
    return [];
  }
};

// Fetch all approved reviews for admin panel view
export const getApprovedReviews = async () => {
  try {
    const testimonialsCollection = collection(db, 'testimonials');
    const q = query(testimonialsCollection, where('approved', '==', true));
    const snapshot = await getDocs(q);
    return snapshot.docs.map(d => ({ id: d.id, ...d.data() }));
  } catch (error) {
    console.error('Error fetching approved reviews:', error);
    return [];
  }
};

// Approve a review — sets approved: true
export const approveReview = async (id) => {
  try {
    const reviewRef = doc(db, 'testimonials', id);
    await updateDoc(reviewRef, { approved: true, approvedAt: serverTimestamp() });
    return true;
  } catch (error) {
    console.error('Error approving review:', error);
    throw error;
  }
};

// Reject / delete a review permanently
export const rejectReview = async (id) => {
  try {
    const reviewRef = doc(db, 'testimonials', id);
    await deleteDoc(reviewRef);
    return true;
  } catch (error) {
    console.error('Error rejecting review:', error);
    throw error;
  }
};

// Why Choose Us Collection
export const getWhyChooseUs = async () => {
  try {
    const whyChooseUsCollection = collection(db, 'whyChooseUs');
    const whyChooseUsSnapshot = await getDocs(whyChooseUsCollection);
    return whyChooseUsSnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
  } catch (error) {
    console.error('Error fetching why choose us:', error);
    return [];
  }
};

// Homepage Content Collection
export const getHomepageContent = async () => {
  try {
    const homepageDoc = await getDoc(doc(db, 'content', 'homepage'));
    if (homepageDoc.exists()) {
      return {
        id: homepageDoc.id,
        ...homepageDoc.data()
      };
    }
    return null;
  } catch (error) {
    console.error('Error fetching homepage content:', error);
    return null;
  }
};

// Hero Slider Collection
export const getHeroSlides = async () => {
  try {
    const slidesCollection = collection(db, 'heroSlides');
    const slidesSnapshot = await getDocs(slidesCollection);
    return slidesSnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
  } catch (error) {
    console.error('Error fetching hero slides:', error);
    return [];
  }
};

export const addStaffMember = async (staffData) => {
  try {
    console.log('Adding staff member:', staffData);
    const staffRef = collection(db, 'staff');
    const staffDoc = {
      name: staffData.name,
      position: staffData.position,
      email: staffData.email || '',
      phone: staffData.phone || '',
      bio: staffData.bio || '',
      image: staffData.image || '',
      workerType: staffData.position === 'Worker' ? staffData.workerType : '',
      createdAt: serverTimestamp()
    };
    
    const docRef = await addDoc(staffRef, staffDoc);
    console.log('Staff member added with ID:', docRef.id);
    return { id: docRef.id, ...staffDoc };
  } catch (error) {
    console.error('Error adding staff member:', error);
    throw error;
  }
};

export const updateStaffMember = async (id, staffData) => {
  try {
    console.log('Updating staff member:', id, staffData);
    const staffRef = doc(db, 'staff', id);
    const staffDoc = {
      name: staffData.name,
      position: staffData.position,
      email: staffData.email || '',
      phone: staffData.phone || '',
      bio: staffData.bio || '',
      image: staffData.image || '',
      workerType: staffData.position === 'Worker' ? staffData.workerType : '',
      updatedAt: serverTimestamp()
    };
    
    await updateDoc(staffRef, staffDoc);
    console.log('Staff member updated successfully');
    return { id, ...staffDoc };
  } catch (error) {
    console.error('Error updating staff member:', error);
    throw error;
  }
};

export const initializeDatabase = async () => {
  try {
    console.log('Initializing database...');

    // Initialize company info
    const companyRef = doc(db, 'company', 'info');
    const companyDoc = await getDoc(companyRef);
    if (!companyDoc.exists()) {
      console.log('Creating company info...');
      await setDoc(companyRef, {
        name: 'Kalpak Insulation',
        description: 'Leading provider of thermal insulation, cold insulation, and scaffolding services in Maharashtra, India.',
        story: 'Kalpak Insulation is an ENERGY MANAGEMENT, EFFICIENCY development and consulting firm that concentrates on the technology needs of organizations.',
        mission: 'We are an industry Leader in Energy Management, offering a wide range of technical solutions, systems, integrations, and services.',
        vision: 'As an innovative solutions provider across a broad spectrum of industry sectors, our technical consulting service is our foremost and most invaluable product.',
        values: 'We are committed to excellence, integrity, and customer satisfaction in everything we do.',
        image: '/placeholder.svg?height=600&width=800',
        createdAt: serverTimestamp()
      });
    }

    // Initialize services
    const servicesRef = collection(db, 'services');
    const servicesSnapshot = await getDocs(servicesRef);
    if (servicesSnapshot.empty) {
      console.log('Creating services...');
      const services = [
        {
          title: 'Thermal Insulation',
          description: 'High-quality thermal insulation solutions for industrial and commercial applications.',
          icon: '🔥',
          features: [
            'Energy efficiency optimization',
            'Temperature control',
            'Heat loss prevention',
            'Custom solutions'
          ],
          price: '5000',
          duration: 'Varies by project',
          active: true
        },
        {
          title: 'Cold Insulation',
          description: 'Specialized cold insulation systems for refrigeration and cooling applications.',
          icon: '❄️',
          features: [
            'Temperature maintenance',
            'Condensation prevention',
            'Energy savings',
            'Custom solutions'
          ],
          price: '6000',
          duration: 'Varies by project',
          active: true
        },
        {
          title: 'Scaffolding Services',
          description: 'Professional scaffolding solutions for construction and maintenance projects.',
          icon: '🏗️',
          features: [
            'Safety compliance',
            'Quick setup',
            'Professional installation',
            'Regular maintenance'
          ],
          price: '4000',
          duration: 'Varies by project',
          active: true
        }
      ];

      for (const service of services) {
        await addDoc(servicesRef, {
          ...service,
          createdAt: serverTimestamp()
        });
      }
    }

    // Initialize staff
    const staffRef = collection(db, 'staff');
    const staffSnapshot = await getDocs(staffRef);
    if (staffSnapshot.empty) {
      console.log('Creating staff members...');
      const staff = [
        {
          name: 'Mr. Sudhir Sawant',
          position: 'Proprietor',
          email: 'sudhir@kalpakinsulation.com',
          phone: '+91 1234567890',
          bio: 'Founder and Proprietor of Kalpak Insulation',
          image: '/placeholder.svg?height=300&width=300'
        },
        {
          name: 'Mr. Ravindra Vispute',
          position: 'Project Manager',
          email: 'ravindra@kalpakinsulation.com',
          phone: '+91 1234567891',
          bio: 'Experienced Project Manager with expertise in industrial insulation',
          image: '/placeholder.svg?height=300&width=300'
        },
        {
          name: 'Mr. Dnyaneshwar Pawar',
          position: 'Site - In charge',
          email: 'dnyaneshwar@kalpakinsulation.com',
          phone: '+91 1234567892',
          bio: 'Site In-charge with extensive field experience',
          image: '/placeholder.svg?height=300&width=300'
        }
      ];

      for (const member of staff) {
        await addDoc(staffRef, {
          ...member,
          createdAt: serverTimestamp()
        });
      }
    }

    // Initialize certificates
    const certsRef = collection(db, 'certificates');
    const certsSnapshot = await getDocs(certsRef);
    if (certsSnapshot.empty) {
      console.log('Creating initial internship certificates...');
      const sampleCertificates = [
        {
          certificateCode: 'KALPAK-INT-2024-001',
          internName: 'Aarav Sharma',
          domain: 'Thermal & Cold Insulation Engineering',
          startDate: '2024-01-10',
          endDate: '2024-04-10',
          duration: '3 Months',
          issueDate: '2024-04-15',
          status: 'Valid',
          grade: 'A+',
          issuedBy: 'Mr. Sudhir Sawant (Proprietor)',
          remarks: 'Demonstrated outstanding technical proficiency in industrial insulation audit and execution.'
        },
        {
          certificateCode: 'KALPAK-INT-2024-002',
          internName: 'Ananya Verma',
          domain: 'Industrial Safety & Scaffolding Operations',
          startDate: '2024-02-01',
          endDate: '2024-05-01',
          duration: '3 Months',
          issueDate: '2024-05-05',
          status: 'Valid',
          grade: 'A',
          issuedBy: 'Mr. Sudhir Sawant (Proprietor)',
          remarks: 'Exceeded expectations in site safety management and quality assessment.'
        }
      ];

      for (const cert of sampleCertificates) {
        await addDoc(certsRef, {
          ...cert,
          createdAt: serverTimestamp()
        });
      }
    }

    console.log('Database initialization completed');
    return true;
  } catch (error) {
    console.error('Error initializing database:', error);
    return false;
  }
}; 