import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Badge } from '@/components/ui/Badge';

describe('Badge Component', () => {
  it('renders with default variant', () => {
    render(<Badge>Test Badge</Badge>);
    expect(screen.getByText('Test Badge')).toBeInTheDocument();
  });

  it('renders with primary variant', () => {
    render(<Badge variant="primary">Primary</Badge>);
    const badge = screen.getByText('Primary');
    expect(badge).toBeInTheDocument();
    expect(badge).toHaveClass('bg-cyan-500/20');
  });

  it('renders with success variant', () => {
    render(<Badge variant="success">Success</Badge>);
    const badge = screen.getByText('Success');
    expect(badge).toBeInTheDocument();
    expect(badge).toHaveClass('bg-green-500/20');
  });

  it('renders with different sizes', () => {
    const { rerender } = render(<Badge size="sm">Small</Badge>);
    expect(screen.getByText('Small')).toHaveClass('px-2', 'py-0.5', 'text-xs');

    rerender(<Badge size="lg">Large</Badge>);
    expect(screen.getByText('Large')).toHaveClass('px-4', 'py-1.5', 'text-base');
  });

  it('renders with count', () => {
    render(
      <Badge count={5}>
        <span>Notifications</span>
      </Badge>
    );
    expect(screen.getByText('5')).toBeInTheDocument();
  });

  it('renders with dot indicator', () => {
    const { container } = render(<Badge dot>Status</Badge>);
    const dot = container.querySelector('.w-2.h-2');
    expect(dot).toBeInTheDocument();
  });
});
