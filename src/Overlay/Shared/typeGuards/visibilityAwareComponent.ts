import { IVisibilityAwareComponent } from '#overlay/Shared/interfaces/index';

export function isVisibilityAwareComponent(subject: unknown): subject is IVisibilityAwareComponent {
    if (typeof subject !== 'object' || subject === null) {
        return false;
    }
    const component = subject as IVisibilityAwareComponent;

    return !!('isVisible' in component);
}