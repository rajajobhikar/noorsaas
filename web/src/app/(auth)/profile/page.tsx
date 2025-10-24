import ProfileForm from './ProfileForm';

export default function ProfilePage() {
  return (
    <div className="p-6 max-w-md mx-auto">
      <h1 className="text-xl font-bold mb-4">Your Profile</h1>
      <ProfileForm />
    </div>
  );
}