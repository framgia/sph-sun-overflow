<?php

namespace App\GraphQL\Directives;

use Closure;
use GraphQL\Type\Definition\ResolveInfo;
use Nuwave\Lighthouse\Exceptions\DefinitionException;
use Nuwave\Lighthouse\Schema\Directives\BaseDirective;
use Nuwave\Lighthouse\Schema\Values\FieldValue;
use Nuwave\Lighthouse\Support\Contracts\FieldMiddleware;
use Nuwave\Lighthouse\Support\Contracts\GraphQLContext;

final class HasPermissionsDirective extends BaseDirective implements FieldMiddleware
{
    // TODO implement the directive https://lighthouse-php.com/master/custom-directives/getting-started.html

    public static function definition(): string
    {
        return
            /** @lang GraphQL */
            <<<'GRAPHQL'
"""
Limit field access to users of a certain role.
"""
directive @hasPermissions(
  """
  The name of the permission authorized users need to have.
  """
  requiredPermission: String!
) on FIELD_DEFINITION
GRAPHQL;
    }

    /**
     * Wrap around the final field resolver.
     *
     * @param  \Nuwave\Lighthouse\Schema\Values\FieldValue  $fieldValue
     * @param  \Closure  $next
     * @return \Nuwave\Lighthouse\Schema\Values\FieldValue
     */
    public function handleField(FieldValue $fieldValue, Closure $next)
    {
        $originalResolver = $fieldValue->getResolver();

        $fieldValue->setResolver(
            function ($root, array $args, GraphQLContext $context, ResolveInfo $resolveInfo) use ($originalResolver) {
                $requiredPermission = $this->directiveArgValue('requiredPermission');
                // Throw in case of an invalid schema definition to remind the developer
                if ($requiredPermission === null) {
                    throw new DefinitionException(
                        "Missing argument 'requiredPermission' for directive '@hasPermissions'."
                    );
                }

                $user = $context->user();
                $permissions = $user->role->permissions->pluck('slug')->toArray();

                if (
                    // Unauthenticated users don't get to see anything
                    ! $user
                    // The user's permission has to match have the required permissions
                    || ! in_array($requiredPermission, $permissions)
                ) {
                    throw new DefinitionException('Unauthorized');
                }

                return $originalResolver($root, $args, $context, $resolveInfo);
            }
        );

        return $next($fieldValue);
    }
}
