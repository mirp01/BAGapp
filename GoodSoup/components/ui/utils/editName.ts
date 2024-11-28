import { getUserData } from '@/config/getData';
import { setUserParameter } from '@/config/setUser';

export const handleEditName = async (
    userId: string,
    newUsername: string,
    setUserData: (userData: any) => void,
    setIsEditing: (isEditing: boolean) => void
): Promise<void> => {
    try {
        const success = await setUserParameter(userId, 'username', newUsername, 0);
        if (success) {
            const updatedUserData = await getUserData(userId);
            if (updatedUserData) {
                setUserData(updatedUserData);
            }
            setIsEditing(false);
        } else {
            console.log('Failed to set/update user data.');
        }
    } catch (error) {
        console.error('Error in handleEditName:', error);
    }
};

export const handleEditButton = (setIsEditing: (isEditing: boolean) => void, inputRef: React.RefObject<any>): void => {
    setIsEditing(true);
    inputRef.current?.focus();
};

export const closeEdit = (setIsEditing: (isEditing: boolean) => void): void => {
    setIsEditing(false);
};