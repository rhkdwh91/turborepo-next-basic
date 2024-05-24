interface ProfileImageProps {
  src: string;
}

export default function ProfileImage({ src }: ProfileImageProps) {
  return (
    <div className="border rounded-full mr-1">
      <img src={src} alt="profile image" width={30} height={30} />
    </div>
  );
}
